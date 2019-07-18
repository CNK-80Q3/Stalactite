import request from '../../../utils/request';

export function fetch({ page = 1 }) {
  let userInfo = sessionStorage.getItem("userInfo") ? sessionStorage.getItem("userInfo") : undefined;
  let user = sessionStorage.getItem("userInfo") ? JSON.parse(userInfo).account : undefined;
  return request(`/article_api?user=${user}&page=${page}`)
}

export function remove(id) {
  return request(`/article_api/${id}`, {
    method: 'DELETE',
  });
}

export function patch(values) {
  return request(`/article_api/${values._id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function create(values) {
    return request('/article_api', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}   

export function search( value ) {
  console.log(JSON.stringify( value ))
  return request('/article_api/search', {
    method: 'POST',
    body: JSON.stringify(value),
  });
} 
