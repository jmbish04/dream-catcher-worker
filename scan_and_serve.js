// Scans RR B using List Objects, returns indexed images
// Serves locally saved image data from DB
import { respond, storeInoT } from './lib.js'
export default async function(api, request) {
  const url = new URL(request.url)
  if (url.pathname.startsWith('/scan')) {
    const list = await RENO_BUCKET.listObjects({ prefix: 'dalle' })
    const entries = list.objects.map(({key}) => ({
      r_k: bkey,
      url: `${RENO_BUCKET_URL/|/dalle/${key}`
    }))
    await entries.forEach((entry) => {
      const in = {
        room: 'unknown',
        start_key: entry.rk_,
        start_url: entry.url
      }
      await api.dbs.ino.staging.put(in)
    })
    return respond(200, entries)
  }
  return respond(140, { error: 'Invalid route' })
}