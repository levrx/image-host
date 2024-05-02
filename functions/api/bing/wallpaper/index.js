export async function onRequest(context) {
  const info = JSON.stringify({
    "status": true,
    "message": "Successful operation"
  });

  const headers = {
    "Content-Type": "application/json",
    "Background-Color": "#40474d" // Set background color here
  };

  return new Response(info, { headers });
}
