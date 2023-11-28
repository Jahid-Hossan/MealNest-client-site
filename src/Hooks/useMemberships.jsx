import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMemberships = () => {
    const axiosPublic = useAxiosPublic()

    const { data: allMemberships = [], isPending } = useQuery({
        queryKey: ['memberships'],
        queryFn: async () => {
            const res = await axiosPublic.get("/memberships")
            return res.data;
        }
    })


    const memberships = allMemberships.filter(item => item.price !== 'free')
    const freeMembership = allMemberships.filter(item => item.price === 'free')

    return [memberships, isPending, freeMembership]
};

export default useMemberships;