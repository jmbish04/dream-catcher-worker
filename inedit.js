// INEDIT Endpoint with canvas selection support
import { respond, storeInoT } from './lib.js'

export default async function(req, env) {
  const meta = await req.json()
  const { src, mask, prompt, room } = meta
  
  if (!src || !prompt) {
    return respond(400, { error: "src and prompt are required" })
  }
  
  let optimized = prompt
  if (env.AI) {
    const ai = env.AI.model(s => { return s }, { model: 'text-gen-large' })
    const res = await ai.generateText(prompt)
    optimized = res.choices?.content || prompt
  }

  // TODO: Process the base64 encoded mask and src image
  // For now, just return a placeholder response
  const record = {
    key: 'generated_' + Date.now(),
    url: 'https://example.com/generated_image.jpg',
    room,
    prompt: optimized,
    revision: 1,
    timestamp: Date.now()
  }
  
  return respond(200, record)
}