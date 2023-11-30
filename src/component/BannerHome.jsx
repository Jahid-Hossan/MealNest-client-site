const BannerHome = () => {
    return (
        <div className=" max-h-[100vh] bg-cover bg-center  bg-[url('https://i.ibb.co/phDnJww/banner-home.png')]">
            <div className=" container mx-auto  ">
                <div className=" w-full lg:w-6/12 pl-6 py-[25vh]">
                    <h2 className=" text-white text-xl lg:text-6xl font-bold"> Hostel Living with Delicious Dining <br /> <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">Experiences!</span></h2>
                    <p className="text-white mt-5 font-semibold"> Elevate your university experience with a delightful array of meals, ensuring each moment is a feast of satisfaction and convenience.</p>
                    <form className="mt-5">
                        <input className="w-2/3 rounded-l-full px-3  py-3" type="text" name='name' placeholder='Search...' />
                        <button className=' py-3 px-6 rounded-r-full bg-btn-clr text-white font-semibold'>Search</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default BannerHome;