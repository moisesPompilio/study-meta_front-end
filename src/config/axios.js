import Axios from "axios";
const baseApiUrl = "http://localhost:3000/";
import Cookies from 'js-cookie'

var token = Cookies.get('token')
console.log("token: " + token)




// const  api = Axios.create({
//     baseURL: baseApiUrl,
//     timeout: 99999,
//     headers: {
//         'Authorization': 'Bearer ' + Cookies.get('token')
//     }
// })



const api = Axios.create({
    baseURL: baseApiUrl,
    headers: {
        'authorization': `Bearer ${Cookies.get('token')}`
    }
})
// api.interceptors.request.use(async (config) => {

//     return config
// }, err => {
//     console.log("error aquiiii")
//     console.log(error)
// });

api.interceptors.response.use(response => {
    
    return response
  }, err => {
    return new Promise(async (resolve, reject) => {
      const originalReq = await err
      let refreshToken = await Cookies.get('refreshToken');
      if (originalReq.response.status === 401 && err.config && !err.config._retry && refreshToken != null) {
        originalReq._retry == true;
        let res = await api.post("aut/refresh", {
            refreshToken: refreshToken
          }).then(async res => {
            await Cookies.set("token", res.data.token);
            await Cookies.set("refreshToken", res.data.refreshToken);
            originalReq.config.headers['authorization'] = await `Bearer ${res.data.token}`

            return await Axios(originalReq.config).then((res, req) => {
                return res;
            }).catch(err => {
                return err;
            });
          }).catch(err => {
            reject(err);
          })
          resolve(res);
      } else if ((originalReq.response.status === 401 && err.config && err.config._retry)) {
        await Cookies.set("token", null);
        await Cookies.set("refreshToken", null);
        await Cookies.set("user_name", null);
        await Cookies.set("user_metas", null);
      } else {
        reject(err)
      }
    })
  })

export default {
    baseApiUrl,
    api,
}