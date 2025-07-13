// Scans R2 Bucket using List Objects, returns indexed images
// Serves locally saved image data from DB
import { respond, storeInoT } from './lib.js'

export default async function(api, request) {
  const url = new URL(request.url)
  if (url.pathname.startsWith('/scan')) {
    try {
      const list = await api.RENO_BUCKET.list({ prefix: 'dalle' })
      const entries = list.objects.map(({key}) => ({
        r2_key: key,
        url: `${api.RENO_BUCKET_URL || ''}/dalle/${key}`
      }))
      
      // Store entries in database
      for (const entry of entries) {
        const record = {
          room: 'unknown',
          start_key: entry.r2_key,
          start_url: entry.url
        }
        try {
          await api.D1.prepare(`
            INSERT OR IGNORE INTO rr_images (room, r2_key, r2_url) 
            VALUES (?, ?, ?)
          `).bind(record.room, record.start_key, record.start_url).run()
        } catch (error) {
          console.error('Database error:', error)
        }
      }
      
      return respond(200, entries)
    } catch (error) {
      console.error('Scan error:', error)
      return respond(500, { error: 'Failed to scan bucket' })
    }
  }
  return respond(404, { error: 'Invalid route' })
}