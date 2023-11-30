const SectionOne = () => {
    return (
        <section>
            <div
                className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
            >
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div
                        className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full"
                    >
                        <img
                            alt="Party"
                            src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>

                    <div className="lg:py-24">
                        <h2 className="text-3xl font-bold sm:text-4xl">Enjoy your meals</h2>

                        <p className="mt-4 text-gray-600">
                            Step into a world of gastronomic pleasure with our 'Enjoy your meals' section. Immerse yourself in a curated selection of exquisite dishes designed to tantalize your taste buds. Our commitment to culinary excellence ensures that each bite is a journey of flavors, textures, and satisfaction. So, take your time, relish the moment, and let the symphony of tastes unfold. Bon appétit!
                        </p>

                        <a
                            href="#"
                            className="mt-8 inline-block rounded bg-btn-clr px-12 py-3 text-sm font-medium text-white transition hover:bg-navy focus:outline-none focus:ring focus:ring-yellow-400"
                        >
                            Get Started Today
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionOne;