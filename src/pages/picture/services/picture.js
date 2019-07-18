import request from '../../../utils/request';

let userInfo = sessionStorage.getItem("userInfo") ? sessionStorage.getItem("userInfo") : undefined;
let user = sessionStorage.getItem("userInfo") ? JSON.parse(userInfo).account : undefined;

export function getPicture({ page = 1 }) {
  return request(`/picture_api?user=${user}&page=${page}`)
}

export function getMyPicture({ page = 1 }) {
  return request(`/picture_api/myPicture?user=${user}&page=${page}`)
}

export function create(values) {
  return request('/picture_api', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function remove(id) {
  return request(`/picture_api/${id}`, {
    method: 'DELETE',
  });
}
export function patch(id, values) {
  return request(`/picture_api/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}
export function getToken() {
  return request('/user_api/token')
}