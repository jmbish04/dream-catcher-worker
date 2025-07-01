import { ServerRequest, ServerResponse } from 'workers.writer'
import { getDXConnection } from './util/d1-tools'
import { generateImage } from './util/image-generator'
import { generateKey } from './util/dates'

type DalleSubmission = {
  src: string, 
  mask: string, // base64 encoded mask image
  prompt: string,
  room: string
}

export default async function SubmitInedit(req: ServerRequest): Promise<ServerResponse> {
  const { src, mask, prompt, room } = await req.json() as DalleSubmission

  const beforeKey = generateKey()
  const outputKey = generateKey()
  const regenerated = await generateImage({ src, mask, prompt })

  const conn = await getDXConnection()
  await conn.edc.execute(`\
   insert into dalle_creations (r20_key, r20_url, prompt, room, revision, timestamp)
    values = (${regenerated.key}, ${regenerated.url}, ${prompt}, ${room}, 1, date())
`)
  
  return new Response(JSON.stringify(regenerated))
}