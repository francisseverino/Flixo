import { SERVER_URL } from './constants';

const request = async (url: string, method = 'get', payload = {}, contentType = 'application/json') => {
  return call(url, method, payload, contentType).then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });
};
const call = async (url: string, method: string, payload = {}, contentType: string) => {
  const body = method === 'post' || method === 'put' ? JSON.stringify(payload) : undefined;
  return fetch(`${SERVER_URL}${url}`, {
    headers: {
      'Content-Type': contentType,
    },
    method,
    ...(body && { body }),
  });
};

export default request;
