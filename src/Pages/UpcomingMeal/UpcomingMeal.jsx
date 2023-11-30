import { useQuery } from "@tanstack/react-query";
import BannerDynamic from "../../component/BannerDynamic";
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import CategoryTab from "../Home/Category/CategoryTab/CategoryTab";
import UpcomingMealCard from "./UpcomingMealCard";
import { Helmet } from "react-helmet";

const UpcomingMeal = () => {
    const axiosSecure = useAxiosSecure()

    const { data: upcomingMeal = [] } = useQuery({
        queryKey: ['upcoming meal'],
        queryFn: async () => {
            const res = await axiosSecure.get('/upcoming')
            return res.data
        }
    })

    console.log(upcomingMeal)



    return (
        <div>
            <Helmet>
                <title>MealNest | Upcoming Meal</title>
            </Helmet>
            <div>
                <BannerDynamic bgUrl={'https://i.ibb.co/0VX01zk/inner-bg2.png'}
                    heading={"Upcoming Meals"}
                ></BannerDynamic>
            </div>
            <div className="my-5 px-5 rounded-md lg:my-10 grid container mx-auto grid-cols-1 lg:grid-cols-3 gap-5">
                {
                    upcomingMeal?.map(item => <UpcomingMealCard key={item._id} item={item}></UpcomingMealCard>)
                }
            </div>
        </div>
    );
};

export default UpcomingMeal;