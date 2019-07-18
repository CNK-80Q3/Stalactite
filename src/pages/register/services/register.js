import request from './../../../utils/request';

export async function doRegist(params) {
  return request( `/user_api/regist`,{
        method: 'POST',
        body: JSON.stringify(params)
	});
}

