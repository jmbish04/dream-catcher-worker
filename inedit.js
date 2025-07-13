// INEDIT Endpoint with canvas selection support
import { respond, storeInoT } from './lib.js'

export default async function(api, request) {
  try {
    const meta = await request.json()
    const { start_key, prompt, room, x, y, width, height } = meta

    if (!start_key || !prompt) {
      return respond(400, { error: "start_key and prompt are required" })
    }

    let optimized = prompt
    
    // Use AI to optimize prompt if available
    if (api.AI) {
      try {
        const aiRequest = {
          messages: [
            { role: 'system', content: 'You are a helpful assistant that optimizes image editing prompts. Make them more descriptive and specific.' },
            { role: 'user', content: `Optimize this image editing prompt: ${prompt}` }
          ]
        }
        const aiResponse = await api.AI.run('@cf/meta/llama-4-scout-17b-16e-instruct', aiRequest)
        optimized = aiResponse.response || prompt
      } catch (error) {
        console.log('AI optimization failed, using original prompt:', error)
      }
    }

    // Add region information if provided
    if (x !== undefined && y !== undefined) {
      optimized += ` [Region: x=${x}, y=${y}, width=${width || 'auto'}, height=${height || 'auto'}]`
    }

    // Call DALL-E API for image editing
    if (!api.OPENAI_API_KEY) {
      return respond(500, { error: 'OpenAI API key not configured' })
    }

    const editResp = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${api.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: `https://${api.RENO_BUCKET_URL || 'bucket'}/${start_key}`,
        prompt: optimized,
        n: 1,
        size: '1024x1024'
      })
    })

    if (!editResp.ok) {
      throw new Error(`OpenAI API error: ${editResp.status}`)
    }

    const editResult = await editResp.json()
    const imageUrl = editResult.data?.[0]?.url

    if (!imageUrl) {
      throw new Error('No image returned from OpenAI')
    }

    // Download and store the edited image
    const imageResponse = await fetch(imageUrl)
    const imageData = await imageResponse.arrayBuffer()
    
    const timestamp = Date.now()
    const end_key = `dalle/${room}/${start_key.replace(/\//g, '_')}_edited_${timestamp}.png`
    
    // Store in R2 bucket
    await api.RENO_BUCKET.put(end_key, imageData)

    const record = {
      room,
      start_key,
      start_url: `https://${api.RENO_BUCKET_URL || 'bucket'}/${start_key}`,
      end_key,
      end_url: `https://${api.RENO_BUCKET_URL || 'bucket'}/${end_key}`,
      prompt: optimized,
      revision: 1,
      timestamp,
      x, y, width, height
    }

    // Save to D1 database
    await api.D1.prepare(`
      INSERT INTO dalle_creations (room, start_key, r2_key, r2_url, prompt, revision, created_at)
      VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(
      record.room,
      record.start_key,
      record.end_key,
      record.end_url,
      record.prompt,
      record.revision
    ).run()

    return respond(200, record)
  } catch (error) {
    console.error('Inedit error:', error)
    return respond(500, { error: `Image editing failed: ${error.message}` })
  }
}