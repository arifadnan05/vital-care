import axios from "axios"
import { useNavigate } from "react-router-dom"
import useAuth from "./useAuth"
const axiosSecure = axios.create({
    baseURL: 'http://localhost:4000'
})
const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut } = useAuth()
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request by interceptors', token)
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error)
    })
    // interceptor 401 and 403
    axiosSecure.interceptors.response.use(function (response) {
        return response
    }, async (error) => {
        const status = error.response.status;
        // console.log('Status error in the interceptors', status)
        // for 401 or 403 logout the user and move the user to the login 
        if (status === 401 || status === 403) {
            await logOut()
            navigate('/login')
        }
        return Promise.reject(error)
    })

    return axiosSecure;
}

export default useAxiosSecure