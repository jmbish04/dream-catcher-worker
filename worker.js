import scanAndServe from './scan_and_serve.js'
import saveEdited from './save_edited.js'
import inedit from './inedit.js'

/** Routing handler */
export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const api = env.bindings

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
