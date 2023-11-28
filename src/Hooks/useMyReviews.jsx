import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"

const useMyReviews = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data = [], refetch } = useQuery({
        queryKey: ['MyReviews'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews?email=${user?.email}`)
            return res.data
        }
    })


    const reviewedMeals = data.result;
    const myReviews = data.myReviews;



    return [reviewedMeals, myReviews, refetch]

};

export default useMyReviews;
