import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import SectionTitle from "../../../../component/SectionTitle";



const Testimonials = ({ allReviews }) => {


    return (
        <section className="my-20">
            <div className="text-center">
                <SectionTitle
                    subHeading="What Our Client Say"
                    heading={'Reviews'}
                ></SectionTitle>
            </div>

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    allReviews?.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className="flex flex-col items-center mx-24 my-16">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className="py-8">{review.comment}</p>
                            <h3 className="text-2xl text-orange-400">{review.user}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonials;