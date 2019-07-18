import request from '../../../utils/request';

export function getUser({ page = 1 }) {
  return request(`/user_api?page=${page}`)
}

export function remove(id) {
  return request(`/user_api/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`/user_api/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function create(values) {
    return request('/user_api', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
