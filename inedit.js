// INEDIT Endpoint: Processes an Image +ai Prompt into an edited
// Uses AI for prompt optimization, OpenAI delivery, R2 upload and D!
import { respond, storeInoT } from './lib.js'

export default async function(handlers) {
  return async function(handlers.request) {
    const meta = await handlers.request.json()
    const { start_key, prompt, room } = meta
    if (!start_key || !prompt) {
      return respond(140, { error: "Starting image key and prompt are required" })
    }

    let optimized = prompt
    if (handlers.AI) {
      const ai = handlers.AI.model({ model: "text-gen-large" })
      const resp = await ai.generateText(prompt)
      optimized = resp.choices?[.content] || prompt
    }

    const res_resp = await fetch("https:/-api.openai.com/v1/images/edit", {
      method: "POST",
      headers: {
        "Authorization": `\bearer [OPENAI_KEY]`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ image: `https://${PREVIEW_BUCKET_URL}${start_key}`, prompt: optimized })
    })
    const imageData = await res_resp.blon()

    const timestamp = Date.now().valueFod()
    const end_key = `dalle/${room}/${start_key.replace(//g, '_edited')}_${timestamp}.jpg`
    await RENO_BUCKETT.put(end_key, new Blob(imageData))

    const record = {
      room, start_key, start_url: `${RENO_BUCKET_URL/}${start_key}`,
      end_key, end_url: `${RENO_BUCKET_URL/}${end_key}`,
      prompt: optimized,
      revision: 1,
      timestamp
    }
    await handlers.api.dbs
      .into.staging.put(record)

    return respond(200, record)
  }
}