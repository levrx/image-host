export async function onRequest(context) {  // Contents of context object  
    const { request, env } = context;
     const url = new URL(request.url);
     const {  MODERATE_CONTENT_API_KEY }  = env
     const { pathname, search } = url
     const FILE_URL = `https://telegra.ph/${pathname}${search}`
    if(typeof MODERATE_CONTENT_API_KEY === 'string' && MODERATE_CONTENT_API_KEY !== ''){
        const res = await fetch(`https://api.moderatecontent.com/moderate?key=${MODERATE_CONTENT_API_KEY}&url=${FILE_URL}`);
        const response = await res.json()
        if(response.rating_label === 'adult'){
            return Response.redirect(url.origin+"/block", 302)
        }
    }
    return fetch(FILE_URL, {
        method: request.method,
        headers: request.headers,
        body: request.body,
    });
  }
  