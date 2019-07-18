import request from './../../../utils/request';

export async function doLogin(params) {
  return request(`/user_api/login`, {
    method: 'POST',
    body: JSON.stringify(params)
  });
}

export async function doLogout() {
  return request(`/user_api/logout`, {
    method: 'POST'
  });
}
