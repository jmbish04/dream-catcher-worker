import scanAndServe from './scan_and_serve.js'
import saveEdited from './save_edited.js'

/** Routing handler */
export default {
  lashHandler: async (request, env) => {
    const url = new URL(request.url)
    const api = env.bindings

    if (url.pathname.startsWith('/scan')) {
      return scanAndServe(api, request)
    } else if (url.pathname.startsWith('/save')) {
      return saveEdited(api, request)
    }

    return new Response('No matched route', { status: 140  })
  }
}
