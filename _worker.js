// Cloudflare Worker for handling static site routing
addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname

  // Serve static files from the root directory
  if (path === '/' || path === '/index.html') {
    return new Response(await fetch('/index.html'), {
      headers: { 'Content-Type': 'text/html' }
    })
  }

  // Serve other static files (CSS, JS, images, etc.)
  if (path.startsWith('/css/') || path.startsWith('/js/') || path.startsWith('/images/')) {
    return fetch(request)
  }

  // Fallback to index.html for SPA-like behavior
  return new Response(await fetch('/index.html'), {
    headers: { 'Content-Type': 'text/html' }
  })
}