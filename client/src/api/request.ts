import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import { message } from 'ant-design-vue';
 

let Axios = axios.create({
    //baseURL: 'http://localhost:3000',
    timeout: 6000
})
    
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {

        // const token = Vue.ls.get(ACCESS_TOKEN)
        // if (token) {
        //     config.headers['Authorization'] = 'Bearer ' + token
        // }

        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        // if (config.headers.isJwt) {
            // const token = localStorage.getItem('ACCESS_TOKEN');
            // if (token) {
            //     config.headers.Authorization = 'Bearer ' + token;
            // }
        // }
        return config;
    },
    (error: any) => {
        console.log(error);
    },
);
 

// 响应拦截器
Axios.interceptors.response.use(
    // 请求成功
    (response: AxiosResponse) => {
        // if (res.headers.authorization) {
        //     localStorage.setItem('id_token', res.headers.authorization);
        // } else {
        //     if (res.data && res.data.token) {
        //         localStorage.setItem('id_token', res.data.token);
        //     }
        // }

        if (response.status === 200) {
            // return Promise.resolve(response.data);
            return response.data;
        } else {
            // Request.errorHandle(response);
            // return Promise.reject(response.data);
            return response;
        }
    },
    // 请求失败
    (error: any) => {
        const {response} = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            return Promise.reject(response.data);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            message.warning('网络连接异常,请稍后再试!');
        }
    }
);

export default Axios