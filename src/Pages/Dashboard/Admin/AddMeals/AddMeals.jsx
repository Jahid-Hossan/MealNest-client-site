import React from 'react';
import { useForm } from 'react-hook-form';


const AddMeals = () => {


    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data); // You can handle form submission logic here
    };

    return (



        <div id="scrollableDiv"
            style={{
                height: 'calc(100vh - 100px)',
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
                            type="number"
                            name="price"
                            className="w-full p-2 border rounded-md"
                            {...register('price', { required: true, min: 0 })}
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
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    >
                        Add Meal
                    </button>

                    <button
                        type="button"
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