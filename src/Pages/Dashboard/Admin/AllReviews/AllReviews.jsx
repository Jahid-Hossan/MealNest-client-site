import { FaArrowUpShortWide, FaArrowUpWideShort } from "react-icons/fa6";
import { TiDeleteOutline } from "react-icons/ti";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

import useAllReviews from "../../../../Hooks/useAllReviews";

const AllReviews = () => {


    // console.log(reviewedMeals, myReviews)
    const [reviewedMeals, allReviews, refetch] = useAllReviews()
    const [ascLikes, setAscLikes] = useState(true);
    const [ascReview, setAscReview] = useState(true);
    const axiosSecure = useAxiosSecure()
    const [sortedLikes, setSortedLikes] = useState();

    console.log(allReviews)

    useEffect(() => {
        setSortedLikes(allReviews)

    }, [allReviews]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            axiosSecure.delete(`/reviews/${id}`)
                .then(res => {
                    console.log(res.data)
                    if (res.data.deletedCount) {
                        refetch()
                        Swal.fire({
                            icon: "success",
                            position: 'top',
                            title: "Review has been deleted successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
                .catch(err => {
                    console.log(err)
                })

        });


    }

    const handleAscLikesChange = () => {
        const allSortedLikes = [...allReviews].sort((a, b) => {
            const likesA = reviewedMeals.find((meal) => meal._id === a.mealId)?.likes || 0;
            const likesB = reviewedMeals.find((meal) => meal._id === b.mealId)?.likes || 0;

            if (!ascLikes) {
                return likesB - likesA;
            } else {
                return likesA - likesB;
            }
        });
        setSortedLikes(allSortedLikes);
        setAscLikes(!ascLikes);
    };

    const handleAscReviewsChange = () => {
        const allSortedReviews = [...allReviews].sort((a, b) => {
            const likesA = reviewedMeals.find((meal) => meal._id === a.mealId)?.reviews || 0;
            const likesB = reviewedMeals.find((meal) => meal._id === b.mealId)?.reviews || 0;

            if (!ascReview) {
                return likesB - likesA;
            } else {

                return likesA - likesB;
            }
        });
        setSortedLikes(allSortedReviews)
        setAscReview(!ascReview);
    };






    return (
        <div>
            <div className="overflow-x-auto my-5">
                <table className="activetable activetable-zebra w-full">
                    {/* head */}
                    <thead className="text-left">
                        <tr>
                            <th>Meal Title</th>
                            <th onClick={handleAscLikesChange} className="flex items-center gap-1"> {ascLikes ? <FaArrowUpWideShort /> : <FaArrowUpShortWide />} <span>Likes</span></th>

                            <th onClick={handleAscReviewsChange} ><span className="flex items-center gap-1">
                                {ascReview ? <FaArrowUpWideShort /> : <FaArrowUpShortWide />} <span>Reviews</span>
                            </span></th>
                            <th>Action</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedLikes?.map(review => <tr
                                key={review._id}
                                className="activehover border-y-2 py-5">
                                <td>
                                    {
                                        reviewedMeals?.find(reviewedMeal => reviewedMeal._id === review.mealId)?.title
                                    }
                                </td>
                                <td>
                                    {
                                        reviewedMeals?.find(reviewedMeal => reviewedMeal._id === review.mealId)?.likes
                                    }
                                </td>
                                <td>
                                    {

                                        reviewedMeals?.find(reviewedMeal => reviewedMeal._id === review.mealId)?.reviews
                                    }
                                </td>
                                <td className="">
                                    <button onClick={() => handleDelete(review._id)} className="btn-sm text-2xl text-btn-clr hover:text-navy"><TiDeleteOutline /></button>
                                </td>
                                <td className="">
                                    <Link to={`/meals/${review.mealId}`} className="btn btn-sm bg-btn-clr hover:bg-navy text-white">Details</Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllReviews;