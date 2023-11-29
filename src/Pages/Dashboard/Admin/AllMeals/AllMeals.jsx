import { GrUpdate } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosSecure from './../../../../Hooks/useAxiosSecure';
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

const AllMeals = () => {
    const [menuId, setMenuId] = useState()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { register, handleSubmit, reset } = useForm();

    const { data: allMeals = [], refetch } = useQuery({
        queryKey: ['allMeal'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-meals?email=${user?.email}`)
            return res.data
        }
    })


    const image_hosting_key = import.meta.env.VITE_image_hosting_api_key;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const handleUpdate = async (data) => {
        data.preventDefault()

        console.log(data.target.mealImage.files[0])

        const imageFile = { image: data.target.mealImage.files[0] };
        const ingredientsArr = data.target.ingredients.value.split(',');

        console.log(ingredientsArr)

        const res = await axios.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(res.data.data.display_url)
        const img = res.data.data.display_url;

        const mealData =
        {
            title: data.target.mealTitle.value,
            type: data.target.mealType.value,
            image: img,
            description: data.target.description.value,
            ingredients: ingredientsArr,
            price: data.target.price.value,
            time: data.target.dateTime.value,
            adminName: data.target.adminName.value,
            adminEmail: data.target.adminEmail.value,
        }
        console.log(mealData)

        if (res.data.success) {
            const res = await axiosSecure.patch(`/update-meals/${menuId}`, mealData)
            const data = res.data;
            if (data.modifiedCount > 0) {
                document.getElementById('my_modal_5').close()
                Swal.fire({
                    icon: "success",
                    position: 'top',
                    title: "Data Successfully Updated",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset()
                refetch()
            }
        }

    }



    return (
        <div id="scrollableDiv"
            style={{
                height: 'calc(100vh - 100px)',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
            }} className="my-5">

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Likes</th>
                            <th>Reviews</th>
                            <th>Distributor Name</th>
                            <th>Distributor Email</th>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allMeals?.map((meal, idx) => <tr key={meal._id}>
                                <th className="text-sm font-normal">{meal.title}</th>
                                <td>{meal.likes}</td>
                                <td>{meal.reviews}</td>
                                <td>{meal.adminName}</td>
                                <td>{meal.adminEmail}</td>
                                <td>
                                    <button onClick={() => {
                                        document.getElementById('my_modal_5').showModal()
                                        setMenuId(meal._id)
                                    }} className="btn btn-ghost text-white text-xl font-bold bg-btn-clr hover:bg-navy btn-md"><GrUpdate />
                                    </button>
                                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <div>
                                                <button onClick={() => document.getElementById('my_modal_5').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                                                <form onSubmit={handleUpdate}>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-600 text-sm font-semibold mb-2">Meal Title</label>
                                                        <input
                                                            defaultValue={meal.title}
                                                            type="text"
                                                            name="mealTitle"
                                                            className="w-full p-2 border rounded-md"
                                                            {...register('mealTitle', { required: true })}
                                                        />
                                                    </div>

                                                    <div className='flex gap-5'>

                                                        <div className="mb-4 flex-1">
                                                            <label className="block text-gray-600 text-sm font-semibold mb-2">Meal Type/Category</label>
                                                            <select
                                                                defaultValue={meal.type}
                                                                name="mealType"
                                                                className="w-full p-2 border rounded-md"
                                                                {...register('mealType', { required: true })}
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="breakfast">Breakfast</option>
                                                                <option value="lunch">Lunch</option>
                                                                <option value="dinner">Dinner</option>
                                                            </select>
                                                        </div>

                                                        <div className="mb-4  flex-1">
                                                            <label className=" text-gray-600 text-sm font-semibold mb-2">Meal Image</label>
                                                            <input
                                                                type="file"
                                                                name="mealImage"
                                                                className="w-full p-2 border rounded-md"
                                                                {...register('mealImage', { required: true })}
                                                            />
                                                        </div>

                                                    </div>

                                                    <div className="mb-4">
                                                        <label className="block text-gray-600 text-sm font-semibold mb-2">Ingredients</label>
                                                        <textarea
                                                            defaultValue={meal.ingredients}
                                                            name="ingredients"
                                                            className="w-full p-2 border rounded-md"
                                                            {...register('ingredients', { required: true })}
                                                        />
                                                    </div>

                                                    <div className="mb-4">
                                                        <label className="block text-gray-600 text-sm font-semibold mb-2">Description</label>
                                                        <textarea
                                                            defaultValue={meal.description}
                                                            name="description"
                                                            className="w-full p-2 border rounded-md"
                                                            {...register('description', { required: true })}
                                                        />
                                                    </div>

                                                    <div className='flex gap-5'>
                                                        <div className="mb-4 flex-1">
                                                            <label className="block text-gray-600 text-sm font-semibold mb-2">Price</label>
                                                            <input
                                                                defaultValue={meal.price}
                                                                step='any'
                                                                type="number"
                                                                name="price"
                                                                className="w-full p-2 border rounded-md"
                                                                {...register('price', { required: true })}
                                                            />
                                                        </div>

                                                        <div className="mb-4 flex-1">
                                                            <label className="block text-gray-600 text-sm font-semibold mb-2">Time/Date</label>
                                                            <input
                                                                type="datetime-local"
                                                                name="dateTime"
                                                                className="w-full p-2 border rounded-md"
                                                                {...register('dateTime', { required: true })}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mb-4">
                                                        <label className="block text-gray-600 text-sm font-semibold mb-2">Admin/Distributor Name</label>
                                                        <input
                                                            defaultValue={meal.adminName}
                                                            type="text"
                                                            name="adminName"
                                                            className="w-full p-2 border rounded-md"
                                                            {...register('adminName', { required: true })}
                                                        />
                                                    </div>

                                                    <div className="mb-4">
                                                        <label className="block text-gray-600 text-sm font-semibold mb-2">Admin/Distributor Email</label>
                                                        <input
                                                            defaultValue={meal.adminEmail}
                                                            type="email"
                                                            name="adminEmail"
                                                            className="w-full p-2 border rounded-md"
                                                            {...register('adminEmail', { required: true })}
                                                        />
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <button
                                                            type="submit"
                                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                                                        >
                                                            Update
                                                        </button>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                    </dialog>
                                </td>
                                <td>
                                    <button className="btn btn-ghost text-white text-xl font-bold bg-btn-clr hover:bg-navy btn-md"><RiDeleteBin6Line />
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-ghost text-white  bg-btn-clr hover:bg-navy btn-md">Details
                                    </button>
                                </td>
                            </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllMeals;