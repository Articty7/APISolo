import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
  // Set method to 'GET' if not defined
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  // If the method is not 'GET', attach the CSRF token
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }

  const res = await window.fetch(url, options);

  if (res.status >= 400) throw res;  // Handle errors if status >= 400

  return res;
}
