import axios from "axios";

const useAxiosPublic = () => {
    const instance = axios.create({
        baseURL: 'https://meal-nest-server.vercel.app',
    });

    return instance;
};



export default useAxiosPublic;