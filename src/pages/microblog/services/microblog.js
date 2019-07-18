import request from '../../../utils/request';

let userInfo = sessionStorage.getItem("userInfo") ? sessionStorage.getItem("userInfo") : undefined;
let user = sessionStorage.getItem("userInfo") ? JSON.parse(userInfo).account : undefined;

export function getMicroblog({ page = 1 }) {
  return request(`/microblog_api?user=${user}&page=${page}`)
}

export function getMyMicroblog({ page = 1 }) {
  return request(`/microblog_api/myMicroblog?user=${user}&page=${page}`)
}

export function remove(id) {
  return request(`/microblog_api/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
    return request(`/microblog_api/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function like(id, like) {
    return request(`/microblog_api/like/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(like),
  });
}

export function create(values) {
    return request('/microblog_api', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function getToken(){
  return request('/user_api/token')
}

export function comment(value) {
  console.log(JSON.stringify(value))
  return request('/comment_api', {
    method: 'POST',
    body: JSON.stringify(value),
  });
}