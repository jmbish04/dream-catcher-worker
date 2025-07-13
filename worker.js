import scanAndServe from './scan_and_serve.js'
import saveEdited from './save_edited.js'
import inedit from './inedit.js'

/** Routing handler */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    
    // Create API object with environment bindings
    const api = {
      RENO_BUCKET: env.RENO_BUCKET,
      RENO_BUCKET_URL: env.RENO_BUCKET_URL,
      D1: env.D1,
      AI: env.AI,
      OPENAI_API_KEY: env.OPENAI_API_KEY
    }

    if (url.pathname.startsWith('/scan')) {
      return scanAndServe(api, request)
    } else if (url.pathname.startsWith('/save')) {
      return saveEdited(api, request)
    } else if (url.pathname.startsWith('/inedit')) {
      return inedit(api, request)
    }

    return new Response('No matched route', { status: 404 })
  }
}
