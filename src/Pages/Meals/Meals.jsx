import { useEffect, useState } from "react";
import useMeals from "../../Hooks/useMeals";
import BannerDynamic from "../../component/BannerDynamic";
import CategoryTab from "../Home/Category/CategoryTab/CategoryTab";
import InfiniteScroll from 'react-infinite-scroll-component';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Meals = () => {
    const axiosPublic = useAxiosPublic()
    const [meals] = useMeals()
    const [filteredMeals, setFilteredMeals] = useState([]);
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('')
    const [search, setSearch] = useState('');


    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    // sort=${asc? 'asc' : 'des'}&search=${search}
    const url = `/meals?type=${category}&sort=${price}`

    useEffect(() => {
        axiosPublic(url)
            .then(res => {
                const notUpcoming = res.data.filter(data => data.upcoming === false)
                setFilteredMeals(notUpcoming)
            })
    }, [url])

    // console.log(category)

    // const { data: meals = [] } = useQuery({
    //     queryKey: ['meals'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get("/meals")
    //         return res.data;
    //     }
    // })


    const handleSearch = (e) => {

        e.preventDefault();
        // console.log(e.target.name.value)
        const getValue = e.target.name.value;
        e.target.name.value = ''
        setSearch(getValue)
        let items = []
        const value = getValue.toLowerCase()
        filteredMeals.map(meal => {
            const mealTitle = meal.title.toLowerCase();
            console.log(mealTitle.includes(value))
            const filtered = mealTitle.includes(value)
            if (filtered) {
                items.push(meal)
            }
        })

        if (items?.length > 0) {
            setFilteredMeals(items)
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "No Meals Found",
                showConfirmButton: false,
                timer: 1500
            });
            setFilteredMeals(meals)
        }

    }



    return (
        <div>
            <Helmet>
                <title>MealNest | Meals</title>
            </Helmet>
            <div>
                <BannerDynamic bgUrl={'https://i.ibb.co/0VX01zk/inner-bg2.png'}
                    heading={"All Meals"}
                ></BannerDynamic>
            </div>
            <div className="px-5 mt-5 lg:mt-16 flex gap-5">
                <div className="grow">
                    <form onSubmit={handleSearch} className=" flex">
                        <input className=" rounded-md grow  bg-slate-100 px-3 outline-none py-3" type="text" name='name' placeholder='Search...' />
                        <button type='submit' className=' py-3 px-6 rounded-md bg-btn-clr text-white font-semibold'>Search</button>
                    </form>

                </div>
                <div>
                    <select onChange={(e) => setCategory(e.target.value)} className="px-3 py-3 rounded-md bg-slate-100" name="" id="">
                        <option value="">All Category</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                </div>
                <div>

                    <select onChange={(e) => setPrice(e.target.value)} className="px-3 rounded-md py-3 bg-slate-100" name="" id="">
                        <option value="">Price</option>
                        <option value="asc">Low - High</option>
                        <option value="desc">High - Low</option>
                    </select>
                </div>
            </div>

            <InfiniteScroll
                className="my-5 px-5 rounded-md lg:my-10 grid grid-cols-1 lg:grid-cols-3 gap-5"
                dataLength={filteredMeals?.length}

                hasMore={true}
                loader={<h4></h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }


            >
                {
                    filteredMeals?.map(item => <CategoryTab key={item._id} item={item}></CategoryTab>)
                }
            </InfiniteScroll>


            {/* <div data-aos="fade-up" className="my-5 px-5 rounded-md lg:my-10 grid grid-cols-3 gap-5">
                {
                    meals?.map(item => <CategoryTab key={item._id} item={item}></CategoryTab>)
                }
            </div> */}
        </div>
    );
};

export default Meals;