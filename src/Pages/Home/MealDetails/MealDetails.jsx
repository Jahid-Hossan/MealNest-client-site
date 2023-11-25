import { Navigate, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import BannerDynamic from "../../../component/BannerDynamic";
import Testimonials from "./Testimonials/Testimonials";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const MealDetails = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();
    const navigate = useNavigate()

    const location = useLocation();

    // console.log(params)
    const lodedData = useLoaderData()

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
            axiosSecure.patch(`/meals/${_id}`)
                .then(res => {
                    console.log(res.data.modifiedCount)

                    if (res.data.modifiedCount) {
                        Swal.fire({
                            icon: "success",
                            position: 'top',
                            title: "Liked",
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


    const meal = lodedData[0][0];
    const allReviews = lodedData[1]

    const { _id, title, type, image, ingredients, description, price, rating, time, likes, reviews, adminName, adminEmail, upcoming } = meal;

    const date = time.split('T')[0]
    console.log(typeof (likes))

    return (
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
                    <div className="space-y-3 grow ">
                        {
                            ingredients?.map((item, idx) => <p key={idx} className="flex items-center gap-1">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 12L10.5347 14.2812C10.9662 14.6696 11.6366 14.6101 11.993 14.1519L16 9M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FE724C" ></path>
                                </svg>
                                <span className="capitalize">{item}</span></p>)
                        }
                    </div>
                    <div className="flex gap-5">
                        <button className="btn flex-1  border-[1px] border-btn-clr text-btn-clr text-xl hover:bg-btn-clr hover:text-white ">Request</button>
                        <button onClick={handleLike} className="btn  border-[1px] border-btn-clr text-btn-clr text-xl hover:bg-btn-clr hover:text-white  ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="lg:my-20  my10 p-5 ">

                <h2 className="text-2xl lg:text-5xl font-semibold pb-2">{title}</h2>
                <hr />
                <div className="flex gap-5 mt-5 text-gray-400">
                    <p>Distributor: {adminName}</p>
                    <p>Date: {date}</p>
                </div>
                <p className="text-gray-600">{description}</p>
            </div>
            <div>

            </div>
            <Testimonials allReviews={allReviews}></Testimonials>
        </div>
    );
};

export default MealDetails;