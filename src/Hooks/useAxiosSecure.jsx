import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'https://meal-nest-server.vercel.app'

})

const useAxiosSecure = () => {
    const { logOut } = useAuth()
    const navigate = useNavigate()

    axiosSecure.interceptors.request.use((config) => {
        // console.log(config.headers)
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(response => {
        return response
    }, async error => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error)
    })



    return axiosSecure
};

export default useAxiosSecure;