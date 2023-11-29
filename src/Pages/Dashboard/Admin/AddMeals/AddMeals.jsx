
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const AddMeals = () => {
    const [upcoming, setUpcoming] = useState("false")
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, reset } = useForm();

    const image_hosting_key = import.meta.env.VITE_image_hosting_api_key;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


    const onSubmit = async (data) => {

        const imageFile = { image: data.mealImage[0] };
        const ingredientsArr = data.ingredients.split(',');

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
            title: data.mealTitle,
            type: data.mealType,
            image: img,
            description: data.description,
            ingredients: ingredientsArr,
            price: data.price,
            rating: 0,
            time: data.dateTime,
            likes: 0,
            reviews: 0,
            adminName: data.adminName,
            adminEmail: data.adminEmail,
            upcoming: upcoming,
        }
        console.log(mealData)

        if (res.data.success) {
            const res = await axiosSecure.post('/add-meals', mealData)
            const data = res.data;
            if (data.insertedId) {
                Swal.fire({
                    icon: "success",
                    position: 'top',
                    title: "Data Successfully added",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset()
            }
        }





    };

    return (



        <div id="scrollableDiv"
            style={{
                height: 440,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
            }} className="w-full mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-semibold mb-2">Meal Title</label>
                    <input
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
                        name="ingredients"
                        className="w-full p-2 border rounded-md"
                        {...register('ingredients', { required: true })}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-semibold mb-2">Description</label>
                    <textarea
                        name="description"
                        className="w-full p-2 border rounded-md"
                        {...register('description', { required: true })}
                    />
                </div>

                <div className='flex gap-5'>
                    <div className="mb-4 flex-1">
                        <label className="block text-gray-600 text-sm font-semibold mb-2">Price</label>
                        <input
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
                        type="text"
                        name="adminName"
                        className="w-full p-2 border rounded-md"
                        {...register('adminName', { required: true })}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-semibold mb-2">Admin/Distributor Email</label>
                    <input
                        type="email"
                        name="adminEmail"
                        className="w-full p-2 border rounded-md"
                        {...register('adminEmail', { required: true })}
                    />
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={() => setUpcoming("false")}
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    >
                        Add Meal
                    </button>

                    <button
                        onClick={() => setUpcoming("true")}
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
                    >
                        Add to Upcoming
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMeals;