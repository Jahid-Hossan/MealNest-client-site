import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMeals = () => {
    const axiosPublic = useAxiosPublic()

    const { data: meals = [] } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const res = await axiosPublic.get("/meals")
            // console.log(res.data)
            const notUpcoming = res.data.filter(data => data.upcoming === false)
            // console.log(notUpcoming)
            return notUpcoming
        }
    })




    return [meals]
};

export default useMeals;