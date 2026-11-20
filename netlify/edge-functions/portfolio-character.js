/** Adds the personal 3D welcome sequence without modifying the cinematic source. */
export default async function portfolioCharacter(request, context) {
  const response = await context.next();
  if (response.status !== 200 || !(response.headers.get('content-type') || '').includes('text/html')) {
    return response;
  }
  const html = await response.text();
  const insertion = '<script type="module" defer src="/portfolio-companion.js"></script>';
  if (!/<\/body>/i.test(html) || html.includes('/portfolio-companion.js')) {
    return new Response(html, response);
  }
  const headers = new Headers(response.headers);
  for (const header of ['content-length','content-encoding','etag']) headers.delete(header);
  const modified = html.replace(/<\/body>/i, insertion + '\n</body>');
  return new Response(modified, {status: response.status, statusText: response.statusText, headers});
}

export const config = { path: '/' };