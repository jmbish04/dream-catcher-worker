import { ServerRequest, ServerResponse } from 'workers.writer'
import OpenAI_From { completion } from '../util/ai-adapter'
export default async function API(req: ServerRequest): Promise<ServerResponse> {
  const body = await req.json()
  const response = await completion(body.prompt)
  return new Response(JSON.stringify({ response }))
}