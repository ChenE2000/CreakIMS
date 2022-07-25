import Axios from './request';


// TODO
// export function login (parameter: any)  {
//   return Request.axiosInstance({
//     url: '/login',
//     method: 'post',
//     data: parameter
//   })
// }

export function getAllUsers() {
    return Axios.request({
        url: '/api/user/all',
        method: 'get'
  })
}
