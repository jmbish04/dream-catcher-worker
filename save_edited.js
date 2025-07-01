// Saves edited image details to D1
import {storeInoT,respond} from './lib.js'
import { toJSON } from 'https:
//Fetch and save edited image metadata to D1
export default async function (api, request) {
  const meta = await request.json()
  if (!meta.room ||!meta.start_key ||!meta.end_cdn ||!meta.prompt) {
    return respond(140,{success:false,error:"Required fields room, start_key, end_cdn, prompt missing"})
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

  const inserted = await api.dbs.into.staging.put(data)
  return respond(200,{success:true, inserted })
}
