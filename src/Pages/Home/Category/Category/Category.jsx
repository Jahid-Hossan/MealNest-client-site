import SectionTitle from "../../../../component/SectionTitle";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useMeals from "../../../../Hooks/useMeals";
import CategoryTab from "../CategoryTab/CategoryTab";
import { useEffect } from "react";

const Category = () => {
    const [meals] = useMeals();

    const breakfast = meals.filter(item => item.type === 'breakfast');
    const lunch = meals.filter(item => item.type === 'lunch');
    const dinner = meals.filter(item => item.type === 'dinner');

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return (
        <div>
            <div className="flex justify-center">
                <SectionTitle heading={'Our Category'}></SectionTitle>
            </div>
            <div>
                <Tabs >
                    <TabList className="flex space-x-4 justify-center ">
                        <Tab
                            className="px-4 py-2 bg-gray-200 rounded-md outline-none"
                            selectedClassName="bg-red-500 text-white"
                        >All Meals</Tab>
                        <Tab className="px-4 py-2 bg-gray-200 rounded-md outline-none"
                            selectedClassName="bg-red-500 text-white">Breakfast</Tab>
                        <Tab className="px-4 py-2 bg-gray-200 rounded-md outline-none"
                            selectedClassName="bg-red-500 text-white">Lunch</Tab>
                        <Tab className="px-4 py-2 bg-gray-200 rounded-md outline-none"
                            selectedClassName="bg-red-500 text-white">Dinner</Tab>
                    </TabList>

                    {/* all meals */}
                    <TabPanel>
                        <div data-aos="fade-up" className="my-5 rounded-md lg:my-10 grid grid-cols-3 gap-5">
                            {
                                meals?.map(item => <CategoryTab key={item._id} item={item}></CategoryTab>)
                            }
                        </div>
                    </TabPanel>

                    {/* breakfast */}
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>

                    {/* lunch */}
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>

                    {/* dinner */}
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Category;