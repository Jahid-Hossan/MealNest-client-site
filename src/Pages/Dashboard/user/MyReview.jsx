import { FaRegEdit } from "react-icons/fa";
import useData from "../../../Hooks/useDatas";
import useMyReviews from "../../../Hooks/useMyReviews";
import { TiDeleteOutline } from "react-icons/ti";
import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";


const MyReview = () => {
    const [requestedMeals, reviews, mealRequest] = useData()
    const [reviewedMeals, myReviews, refetch] = useMyReviews()
    const [reviewId, setReviewId] = useState()
    // console.log(reviewedMeals, myReviews)

    const [rating, setRating] = useState()
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    console.log(reviewId)

    const url = `/reviews/${reviewId}`;

    const handleReview = (e) => {
        e.preventDefault();
        const reviewData = {
            rating: rating,
            comment: e.target.comment.value
        }
        axiosSecure.patch(url, reviewData)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        icon: "success",
                        position: 'top',
                        title: "Review has been updated successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    e.target.reset();
                    document.getElementById('my_modal_5').close()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


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
                            <th>Action</th>
                            <th>Action</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myReviews?.map(review => <tr
                                key={review._id}
                                className="activehover border-y-2 py-5">
                                <td>
                                    {
                                        reviewedMeals?.find(reviewedMeal => reviewedMeal._id === review.mealId).title
                                    }
                                </td>
                                <td>
                                    {
                                        reviewedMeals?.find(reviewedMeal => reviewedMeal._id === review.mealId).likes
                                    }
                                </td>
                                <td>
                                    {

                                        reviews?.filter(reviewedMeal => reviewedMeal.mealId === review.mealId).length

                                    }
                                </td>
                                <td className="capitalize">
                                    <button onClick={() => {
                                        document.getElementById('my_modal_5').showModal()
                                        setReviewId(review._id)
                                    }} className="btn-sm text-xl  text-navy hover:text-btn-clr ">
                                        <FaRegEdit />
                                    </button>

                                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <div>
                                                <button onClick={() => document.getElementById('my_modal_5').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                                                <form onSubmit={handleReview} className=" space-y-5" >
                                                    <div className="flex gap-5">
                                                        <h2>How do you rate this product?</h2>
                                                        <div onChange={(e) => setRating(e.target.value)} className="rating">
                                                            <input value={1} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                            <input value={2} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                            <input value={3} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                            <input value={4} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                            <input value={5} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                        </div>
                                                    </div>

                                                    <div className="">
                                                        <label className="block ">Add a review</label>
                                                        {/* {console.log(review.comment, review._id)} */}
                                                        <textarea id="message" defaultValue={review.comment} rows="6" name="comment" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..." required ></textarea>
                                                    </div>

                                                    <button type="submit" className="btn btn-ghost bg-btn-clr hover:bg-navy text-white">Update</button>
                                                </form>

                                            </div>
                                        </div>
                                    </dialog>

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

export default MyReview;