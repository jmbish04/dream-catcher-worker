// Library utilities for worker
export function respond(status, data) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: { 'Content-Type': 'application/json' }
  });
}

export function storeInoT(data) {
  // TODO: Implement storage
  return Promise.resolve(data);
}