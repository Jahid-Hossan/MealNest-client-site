
import MembershipCard from "./MembershipCard";
import useMemberships from './../../../Hooks/useMemberships';

const MemberShip = () => {

    const [memberships] = useMemberships()

    // {memberships.map(membership=><div key={membership._id}

    return (
        <section className="py-10 bg-white sm:py-16 lg:py-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Pricing & Plans</h2>
                    <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
                </div>

                <div className=" max-w-md grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 text-center lg:max-w-full lg:mt-16 lg:grid-cols-3">
                    {
                        memberships.map(membership => <MembershipCard
                            key={membership._id}
                            membership={membership}
                        ></MembershipCard>)}
                </div>
            </div>
        </section>

    );
};

export default MemberShip;




