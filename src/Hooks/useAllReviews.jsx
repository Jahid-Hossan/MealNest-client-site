import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"

const useAllReviews = (ascLikes, ascReview) => {

    const axiosSecure = useAxiosSecure()

    const { data = [], refetch } = useQuery({
        queryKey: ['AllReviews'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-reviews?sortLikes=${ascLikes ? 'asc' : 'desc'}&sortReviews=${ascReview ? 'asc' : 'desc'}`)
            return res.data
        }
    })

    const reviewedMeals = data.result;
    const allReviews = data.AllReviews;



    return [reviewedMeals, allReviews, refetch]

};

export default useAllReviews;
