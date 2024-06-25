import http from './config'
const auth = {
    sign_in: (data)=> http.post("/auth/login",data),
    sign_up: (data)=> http.post("/auth/register", data),
    auth_verify: (data) => http.post("/auth/verify", data)
}
export default auth