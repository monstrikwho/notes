export async function serviceInvoker(req, res, callback, service) {
  console.log(`[${service}.${callback.name}] Service has been started`);

  try {
    const data = await callback(req.body, req.query, req.headers);
    return res.send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return res.send(error);
    }

    return String(error);
  }
}
