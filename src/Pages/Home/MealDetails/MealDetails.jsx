import { Link, Navigate, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import BannerDynamic from "../../../component/BannerDynamic";
import Testimonials from "./Testimonials/Testimonials";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import AddReview from "./Testimonials/AddReview/AddReview";
import { FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useMemberships from "../../../Hooks/useMemberships";
import { Helmet } from "react-helmet";






const MealDetails = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();
    const navigate = useNavigate()
    const lodedData = useLoaderData()
    const meal = lodedData[0][0];
    const allReviews = lodedData[1]

    const { _id, title, type, image, ingredients, description, price, rating, time, likes, reviews, adminName, adminEmail, upcoming } = meal;
    const [memberships] = useMemberships()
    const date = time.split('T')[0]
    console.log(allReviews)

    const { data: member = [] } = useQuery({
        queryKey: ['user-profile'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`)
            return res.data
        }
    })

    const isPremium = member.filter(subscription => subscription.price !== 'free')

    console.log(isPremium)


    const handleLike = () => {
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
            const userDetails = {
                email: user.email
            }
            axiosSecure.patch(`/meals/${_id}`, userDetails)
                .then(res => {
                    console.log(res.data)

                    if (res.data.modifiedCount !== null) {
                        Swal.fire({
                            icon: "success",
                            position: 'top',
                            title: "Liked",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            position: 'top',
                            title: `${res.data.massage}`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }


    }

    // const isPremium = member.membershipId.map(id => {
    //     memberships.map(membership => membership._id === id)
    // })
    console.log(member);

    const handleRequest = () => {
        const requestedMealData = {
            name: user?.name,
            email: user?.email,
            mealId: _id,
            requesTime: new Date().toJSON(),
            status: 'pending'
        }

        if (isPremium.length === 0) {
            return Swal.fire({
                icon: "error",
                position: 'top',
                title: 'Buy membership to request meal',
                showConfirmButton: false,
                timer: 1500
            });
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
                }
            });


        } else {
            axiosSecure.post('/requestMeals', requestedMealData)
                .then(res => {
                    console.log(res.data.insertedId)
                    console.log(res.data.massage)

                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: "success",
                            position: 'top',
                            title: "Request Successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            position: 'top',
                            title: `${res.data.massage}`,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <>
            <Helmet>
                <title>MealNest | {title}</title>
            </Helmet>

            <div className="container mx-auto">

                <div>
                    <BannerDynamic bgUrl={'https://i.ibb.co/0VX01zk/inner-bg2.png'}
                        heading={"Meal Details"}
                        subHeading={title}></BannerDynamic>
                </div>



                <div className="grid lg:grid-cols-12 gap-5 my-10 overflow-hidden ">
                    <div className="col-span-full lg:col-span-8 ">
                        {/* <h2 className="text-5xl font-semibold">{title}</h2> */}
                        <img src={image} alt="" className=" my-auto max-h-[70vh] w-full object-cover object-center rounded-lg" />
                    </div>
                    <div className="col-span-full lg:col-span-4 flex flex-col shadow-md space-y-3 p-6">
                        <h2 className="text-2xl font-semibold">Ingredients</h2>
                        <div className="grow">
                            <div className="space-y-3  ">
                                {
                                    ingredients?.map((item, idx) => <p key={idx} className="flex items-center gap-1">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 12L10.5347 14.2812C10.9662 14.6696 11.6366 14.6101 11.993 14.1519L16 9M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FE724C" ></path>
                                        </svg>
                                        <span className="capitalize">{item}</span></p>)
                                }
                            </div>
                            <div className=" mt-5 text-gray-400 space-y-2">
                                <p>Distributor: {adminName}</p>
                                <p>Date: {date}</p>
                                <p className="flex gap-1 items-center">Rating: {rating} <FaStar className="text-yellow-400" /></p>
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <button onClick={handleRequest} className="btn flex-1  border-[1px] border-btn-clr text-btn-clr text-xl hover:bg-btn-clr hover:text-white ">Request</button>
                        </div>
                    </div>
                </div>



                <div className="lg:my-14 my-10 p-5 ">

                    <h2 className="text-2xl lg:text-5xl font-semibold pb-2">{title}</h2>
                    <hr className="my-5" />
                    <h2 className="font-semibold">Meal Description</h2>
                    <p className="text-gray-600">{description}</p>
                </div>

                <Link to={'/meals'} className="btn flex-1 mb-10  border-[1px] border-btn-clr text-btn-clr text-xl hover:bg-btn-clr hover:text-white ">View All Meals</Link>

                <AddReview id={_id}></AddReview>
                <Testimonials allReviews={allReviews}></Testimonials>
            </div>
        </>
    );
};

export default MealDetails;