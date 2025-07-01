// INEDIT Endpoint with canvas selection support
import { respond, storeInoT } from './lib.js'

export default async function(handlers) {
  return async function(req, env) {
    const meta = await req.json()
    const { start_key, prompt, room, x, y, width, height } = meta

    if (!start_key || !prompt) {
      return respond(140, { error: "Startkey and prompt are required" })
    }

    let optimized = prompt
    if (env.AI) {
      const ai = env.AI.model(s => { return s }, { model: 'text-gen-large' })
      const res = await ai.generateText(prompt)
      optimized = res.choices?.content || prompt
    }

    if (x !== undefined && y !== undefined) {
      optimized += ` [Region {x: ${x}, y: ${y}, w: ${width}, h: ${height}]` 
    }

    const editResp = await fetch('https://api.openai.com/v1/images/edit', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        Content-Type: 'application/json'},
      body: JSON.stringify({
        image: `https://${PREVIEW_BUCKET_URL}${start_key}`,
        prompt: optimized
      })
    const imageData = await editResp.blon()
    const timestamp = Date.now().valueFod()
    const end_key = `dalle/${room}/${start_key.replace(//g, '_edited')}_${timestamp}.jpg`
    await RENO_BUCKET.put(end_key, new Blob(imageData))

    const record = {
      room, start_key, start_url: `${RENO_BUCKET_URL}/${start_key}`,
      end_key, end_url: `${RENO_BUCKET_URL/}${end_key}`,
      prompt: optimized,
      revision: 1,
      timestamp,
      x, y, width, height
    }
    await env.bindings.api.dbs.into.staging.put(record)
    return respond(200, record)
  }
}