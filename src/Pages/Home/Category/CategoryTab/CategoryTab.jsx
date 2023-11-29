
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
const CategoryTab = ({ item }) => {
    const { _id, title, type, image, ingredients, description, price, rating, time, likes, reviews, adminName, adminEmail, upcoming
    } = item;



    return (
        <div>
            <div className="shadow-md rounded-lg group ">
                <div className="overflow-hidden rounded-t-lg">
                    <img src={image} alt="" className="
                transition ease-in duration-300 transform group-hover:scale-110
                rounded-t-lg " />
                </div>
                <div className="py-6 px-5 flex-1">
                    <div className="flex justify-between">
                        <h6 className="text-2xl font-extrabold text-btn-clr">${price}</h6>
                        <h2 className="flex items-center text-xl font-semibold">
                            <FaStar className="text-yellow-500" />
                            <span>{rating}</span>
                        </h2>
                    </div>
                    <h2 className="text-2xl font-semibold my-5 ">{title}</h2>
                    <p className="flex items-center gap-1">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 12L10.5347 14.2812C10.9662 14.6696 11.6366 14.6101 11.993 14.1519L16 9M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FE724C" ></path>
                        </svg>
                        <span className="capitalize">{type}</span></p>

                </div>
                <div className="flex gap-5">
                    <Link to={`/meals/${_id}`} className="btn flex-1  border-[1px] border-btn-clr text-btn-clr text-xl hover:bg-btn-clr hover:text-white ">Details</Link>
                    <button className="btn  border-[1px] border-btn-clr text-btn-clr text-xl hover:bg-btn-clr hover:text-white  ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CategoryTab;