import BannerHome from "../../../component/BannerHome";
import Category from "../Category/Category/Category";
import MemberShip from "../MemberShip/MemberShip";

const Home = () => {
    return (
        <>
            <BannerHome />
            <div className="container mx-auto">
                <Category></Category>
                <MemberShip></MemberShip>
            </div>
        </>
    );
};

export default Home;