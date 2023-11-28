import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"

const useData = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data = [] } = useQuery({
        queryKey: ['reqMeal'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requestMeals?email=${user?.email}`)
            return res.data
        }
    })


    const requestedMeals = data.result;
    const reviews = data.reviewRes;
    const mealRequest = data.mealRequest;

    return [requestedMeals, reviews, mealRequest]

};

export default useData;
