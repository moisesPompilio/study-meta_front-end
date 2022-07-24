
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

export default {

    get: (url) => {
        let headers = {
            'authorization': 'Bearer ' + Cookies.get('token')
        }
        console.log(headers);
        Axios.get(`${baseApiUrl}${url}`, {
            headers: {
                'authorization': `Bearer ${Cookies.get('token')}`
            }
        }).then(response => {
            console.log(response.data)
            console.log('response.data')
            return response.data;
        }).catch(error => {
            return {
                error: true,
                message: error.message
            };
        })
    },
    post: (url, body) => {
        Axios.post(`${baseApiUrl}${url}`, body, {
            headers: {
                'authorization': `Bearer ${Cookies.get('token')}`
            }
        }).then(response => {
            console.log(response.data)
            console.log('response.data')
            return response.data;
        }).catch(error => {
            return {
                error: true,
                message: error.message
            };
        })
    },
    put: (url, body) => {
        Axios.put(`${baseApiUrl}${url}`, body, {
            headers: {
                'authorization': `Bearer ${Cookies.get('token')}`
            }
        }).then(response => {
            console.log(response.data)
            console.log('response.data')
            return response.data;
        }).catch(error => {
            return {
                error: true,
                message: error.message
            };
        })
    },
    delete: (url, body) => {
        Axios.put(`${baseApiUrl}${url}`, body, {
            headers: {
                'authorization': `Bearer ${Cookies.get('token')}`
            }
        }).then(response => {
            console.log(response.data)
            console.log('response.data')
            return response.data;
        }).catch(error => {
            return {
                error: true,
                message: error.message
            };
        })
    },
}