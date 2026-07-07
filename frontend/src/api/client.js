// Standalone API client — no base44 dependency
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

async function request(method, path, body, options = {}) {
  const headers = {};
  let reqBody;

  if (body instanceof FormData) {
    reqBody = body;
  } else if (body) {
    headers['Content-Type'] = 'application/json';
    reqBody = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: reqBody,
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || `Request failed: ${res.status}`);
  }

  return res.json();
}

export const api = {
  rsvp: {
    create: (data) => request('POST', '/rsvp', data),
  },
  upload: {
    file: (file) => {
      const fd = new FormData();
      fd.append('file', file);
      return request('POST', '/upload', fd);
    },
  },
};
