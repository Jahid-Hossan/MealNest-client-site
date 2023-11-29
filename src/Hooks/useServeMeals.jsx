import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"
import { useEffect } from "react";

const useServeMeals = (search) => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data = [], refetch } = useQuery({
        queryKey: ['reqMeal'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/serve-meals?search=${search}`)
            return res.data
        }
    })

    useEffect(() => {
        refetch()
    }, [search, refetch])

    const requestedMeals = data.result;
    const mealRequest = data.mealRequest;

    console.log(requestedMeals, mealRequest)

    return [requestedMeals, mealRequest, refetch]

};

export default useServeMeals;
