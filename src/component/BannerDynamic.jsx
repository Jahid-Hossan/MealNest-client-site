const BannerDynamic = ({ bgUrl, heading, subHeading }) => {
    return (
        <div className={'max-h-screen bg-blend-multiply'} style={{ backgroundImage: ` url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', }}>
            <div className=" py-14 lg:py-[25vh]">

                <h2 className="text-white text-2xl lg:text-5xl font-bold text-center">{heading}</h2>
                <h2 className="mt-5 text-white text-3xl font-bold text-center">{subHeading}</h2>

            </div>
        </div>
    );
};

export default BannerDynamic;