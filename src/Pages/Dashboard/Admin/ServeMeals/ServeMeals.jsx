import { useEffect, useState } from "react";
import useServeMeals from "../../../../Hooks/useServeMeals";
import useAxiosSecure from './../../../../Hooks/useAxiosSecure';
import Swal from "sweetalert2";




const ServeMeals = () => {

    const [search, setSearch] = useState('');
    const [requestedMeals, mealRequest, refetch] = useServeMeals(search)
    const axiosSecure = useAxiosSecure()
    console.log(requestedMeals, mealRequest)

    const handleServe = (requestedMeal) => {

        if (requestedMeal?.status === 'delivered') {
            return Swal.fire({
                position: "center",
                icon: "error",
                title: "Meal already delivered",
                showConfirmButton: false,
                timer: 1500
            });
        }

        axiosSecure.patch(`/serve/${requestedMeal._id}`)
            .then(res => {
                refetch()
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Meal has been served",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleSearch = e => {
        e.preventDefault();
        const searchText = e.target.search.value;
        // console.log(searchText);
        setSearch(searchText);

    }

    return (
        <div>
            <div className="grow">
                <form onSubmit={handleSearch} className=" top-0 flex">
                    <input className=" rounded-md grow  bg-slate-100 px-3 outline-none py-3" type="text" name='search' placeholder='User Name or email' />

                    <button type='submit' className=' py-3 px-6 rounded-md bg-btn-clr text-white font-semibold hover:bg-navy'>Search</button>
                </form>

            </div>
            <div className="overflow-x-auto my-5">
                <table className="activetable activetable-zebra w-full">
                    {/* head */}
                    <thead className="text-left">
                        <tr>
                            <th>Meal Title</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mealRequest?.map(requestedMeal => <tr
                                key={requestedMeal._id}
                                className="activehover border-y-2 py-5">
                                <td>{requestedMeals?.find(meal => meal._id === requestedMeal.mealId)?.title}</td>
                                <td>{requestedMeal.name}</td>
                                <td>
                                    {requestedMeal.email}
                                </td>
                                <td className="capitalize">
                                    {requestedMeal.status}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleServe(requestedMeal)}
                                        // disabled={requestedMeal?.status === 'delivered'}
                                        className="btn btn-sm bg-btn-clr hover:bg-navy text-white">Serve</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServeMeals;


