import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMeals = () => {
    const axiosPublic = useAxiosPublic()

    const { data: meals = [] } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const res = await axiosPublic.get("/meals")
            return res.data;
        }
    })


    // const {data:meal=[]}=useQuery({
    //     queryKey: ['meals'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get("/meals")
    //         return res.data;
    //     }
    // })

    return [meals]
};

export default useMeals;