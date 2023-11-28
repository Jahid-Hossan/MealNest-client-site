import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useMeals from "../../../../Hooks/useMeals";



const AdminProfile = () => {

    const { user } = useAuth()
    const [meals] = useMeals()

    console.log(user?.photoURL)

    const axiosSecure = useAxiosSecure()

    const { data: member = [] } = useQuery({
        queryKey: ['admin-profile'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`)
            return res.data
        }
    })


    const addedMeals = meals.filter(meal => meal.adminEmail === user?.email)

    console.log(addedMeals)

    return (
        <div className="min-h-screen bg-navy">
            <h2 className="text-white px-10 pt-5 text-3xl font-bold">Admin Profile</h2>
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
                        <p>{addedMeals.length} Meals Added</p>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminProfile;