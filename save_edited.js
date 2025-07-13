// Saves edited image details to D1
import { storeInoT, respond } from './lib.js'

// Fetch and save edited image metadata to D1
export default async function (api, request) {
  try {
    const meta = await request.json()
    if (!meta.room || !meta.start_key || !meta.end_cdn || !meta.prompt) {
      return respond(400, {
        success: false,
        error: "Required fields room, start_key, end_cdn, prompt missing"
      })
    }

    const timestamp = new Date().getTime()
    const data = {
      room: meta.room,
      start_key: meta.start_key,
      end_cdn: meta.end_cdn,
      end_key: meta.end_key || null,
      prompt: meta.prompt,
      revision: Number(meta.revision) || 1,
      timestamp
    }

    // Insert into D1 database
    const inserted = await api.D1.prepare(`
      INSERT INTO dalle_creations (room, start_key, r2_key, r2_url, prompt, revision, created_at)
      VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(
      data.room,
      data.start_key,
      data.end_key,
      data.end_cdn,
      data.prompt,
      data.revision
    ).run()

    return respond(200, { success: true, inserted: inserted.meta })
  } catch (error) {
    console.error('Save edited error:', error)
    return respond(500, { success: false, error: 'Failed to save edited image' })
  }
}
