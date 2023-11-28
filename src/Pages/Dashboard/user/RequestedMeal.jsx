
import useData from "../../../Hooks/useDatas";


const RequestedMeal = () => {

    const [requestedMeals, reviews, mealRequest] = useData()


    return (
        <div>
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
                            requestedMeals?.map(requestedMeal => <tr
                                key={requestedMeal._id}
                                className="activehover border-y-2 py-5">
                                <td>{requestedMeal.title}</td>
                                <td>{requestedMeal.likes}</td>
                                <td>
                                    {
                                        reviews?.filter(review => review.mealId === requestedMeal._id)?.length
                                    }
                                </td>
                                <td className="capitalize">
                                    {
                                        mealRequest.find(meal => meal.mealId === requestedMeal._id)?.status
                                    }

                                </td>
                                <td>
                                    <button
                                        disabled={mealRequest.find(meal => meal.mealId === requestedMeal._id)?.status === 'delivered'}
                                        className="btn btn-sm bg-btn-clr hover:bg-navy text-white">Cancel</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedMeal;