import { Link } from "react-router-dom";

const MembershipCard = ({ membership }) => {
    // console.log(membership)
    const { _id, level, price, badgeImg, facilities } = membership;
    return (
        <div>
            <div className="overflow-hidden bg-white border-2 border-gray-100 rounded-md">
                <div className="p-8 xl:px-12">

                    <img src={badgeImg} alt="" />
                    <p className="mt-3 text-base text-gray-600">Monthly payment</p>

                    <ul className="inline-flex flex-col items-start space-y-5 text-left mt-9">
                        {
                            facilities?.map((fac, i) => <li key={i} className="inline-flex items-center space-x-2">
                                <svg className="flex-shrink-0 w-5 h-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                </svg>
                                <span className="text-base font-medium text-gray-900"> {fac} </span>
                            </li>)
                        }
                    </ul>
                    <Link to={`/payment/${_id}`}><button className="btn btn-ghost btn-wide mt-10 text-3xl bg-btn-clr hover:bg-navy text-white">Pay ${price}</button></Link>
                </div>
            </div>
        </div>
    );
};

export default MembershipCard;