import { useState } from "react";
import useAuth from "../../../../../Hooks/useAuth";
import useAxiosSecure from './../../../../../Hooks/useAxiosSecure';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddReview = ({ id }) => {

    const [rating, setRating] = useState()
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    // console.log(user)

    const handleReview = (e) => {
        e.preventDefault();


        const reviewData = {
            mealId: id,
            user: user?.displayName,
            email: user?.email,
            rating: rating,
            comment: e.target.comment.value
        }
        if (!user) {
            Swal.fire({
                title: "You need to log In first",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(`/login`)
                    // return <Navigate state={location.pathname} to='/login' />;

                }
            });
        } else {
            axiosSecure.post('/reviews', reviewData)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: "success",
                            position: 'top',
                            title: "Review has been submitted successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        e.target.reset();
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <div>
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
                    <textarea id="message" rows="6" name="comment" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..." required></textarea>
                </div>

                <button className="btn btn-ghost bg-btn-clr hover:bg-navy text-white">Submit</button>
            </form>

        </div>
    );
};

export default AddReview;