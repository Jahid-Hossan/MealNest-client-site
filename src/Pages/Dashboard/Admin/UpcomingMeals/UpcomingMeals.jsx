import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpcomingMeals = () => {
    const axiosSecure = useAxiosSecure()

    const { data: upcomingMeals = [], refetch } = useQuery({
        queryKey: ['upcomingMeals'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/upcoming-meals`)
            return res.data
        }
    })

    const handlePublish = (id, likes) => {
        console.log(id)

        if (likes <= 10) {
            return Swal.fire({
                position: "center",
                icon: "error",
                title: "Meal should have at least 10 likes to publish",
                showConfirmButton: false,
                timer: 1500
            });
        }

        axiosSecure.patch(`/upcoming-meals/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Meal has been published",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }

            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="overflow-x-auto my-5">
            <table className="activetable activetable-zebra w-full">
                {/* head */}
                <thead className="text-left">
                    <tr>
                        <th>Meal Title</th>
                        <th>Likes</th>
                        <th>Reviews</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        upcomingMeals?.map(requestedMeal => <tr
                            key={requestedMeal._id}
                            className="activehover border-y-2 py-5">
                            <td>{requestedMeal.title}</td>
                            <td>{requestedMeal.likes}</td>
                            <td>
                                {requestedMeal.reviews}
                            </td>
                            <td className="capitalize">
                                {/* {console.log(requestedMeal.upcoming)} */}
                                {requestedMeal.upcoming === 'true' && "Upcoming"}
                            </td>
                            <td>
                                <button
                                    onClick={() => handlePublish(requestedMeal._id, requestedMeal.likes)}
                                    className="btn btn-sm bg-btn-clr hover:bg-navy text-white">Publish</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default UpcomingMeals;