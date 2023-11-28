import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Profile = () => {

    const { user } = useAuth()

    console.log(user?.photoURL)

    const axiosSecure = useAxiosSecure()

    const { data: member = [] } = useQuery({
        queryKey: ['user-profile'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`)
            return res.data
        }
    })

    console.log(member)




    return (
        <div className="min-h-screen bg-navy">
            <h2 className="text-white px-10 pt-5 text-3xl font-bold">My Profile</h2>
            <div className="px-4 py-12 flex text-white gap-10 rounded-lg  max-h-screen mx-auto  sm:px-8 md:px-12 dark:bg-gray-900">

                <div className="">
                    <img src={user?.photoURL} alt="" className="rounded-full w-64 h-64  object-cover object-center" />
                </div>
                <div className="mt-10 space-y-5">
                    <div>
                        <p>Name:</p>
                        <h6 className="text-lg font-semibold">{user?.displayName}</h6>
                    </div>

                    <div>
                        <p>Email:</p>
                        <h6 className="text-lg font-semibold">{user?.email}</h6>
                    </div>

                    <div>
                        <p>Earned Badges:</p>
                        <h2 className="w-12 ">
                            {member?.map(badge => <>
                                <img src={badge.badgeImg} alt="" className="" />
                            </>)}
                        </h2>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;