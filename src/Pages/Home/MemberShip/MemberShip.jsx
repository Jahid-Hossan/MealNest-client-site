const MemberShip = () => {
    return (
        <div>
            <section className="py-10 bg-white sm:py-16 lg:py-24">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Simple Pricing</h2>
                        <p className="max-w-md mx-auto mt-4 text-base leading-relaxed text-gray-600">Try free for 30 Days</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 mx-auto mt-8 text-center md:max-w-5xl sm:grid-cols-3 md:gap-8 sm:mt-16">
                        <div className="relative overflow-hidden bg-transparent border-2 border-gray-100 rounded-md">
                            <div className="absolute hidden top-3 right-3">
                                <svg className="w-6 h-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                            </div>

                            <div className="px-4 py-5 lg:p-8">
                                <p className="text-lg font-medium text-gray-500">Silver</p>
                                <p className="mt-4 text-6xl font-bold text-black">Free</p>
                                <ul className="flex flex-col mt-8 space-y-1">
                                    <li className="text-base font-medium text-gray-900 lg:text-xl">Less than $1 a day</li>
                                    <li className="text-base font-medium text-gray-600 lg:text-xl">Billed every week</li>
                                    <li className="text-base font-medium text-gray-600 lg:text-xl">Cancel anytime</li>
                                </ul>
                            </div>
                            <div className="mt-8 text-center md:mt-16">
                                <a href="#" title="" className="inline-flex items-center justify-center px-10 py-4 font-semibold text-white transition-all duration-200 rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:opacity-80 hover:opacity-80" role="button"> Create your account </a>

                            </div>
                        </div>

                        <div className="relative overflow-hidden bg-transparent border-2 border-gray-100 rounded-md">
                            <div className="absolute hidden top-3 right-3">
                                <svg className="w-6 h-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                            </div>

                            <div className="px-4 py-5 lg:p-8">
                                <p className="text-lg font-medium text-gray-500">1 Month</p>
                                <p className="mt-4 text-6xl font-bold text-black">$19</p>
                                <ul className="flex flex-col mt-8 space-y-1">
                                    <li className="text-base font-medium text-gray-900 lg:text-xl">Less than $5 a week</li>
                                    <li className="text-base font-medium text-gray-600 lg:text-xl">Billed every month</li>
                                    <li className="text-base font-medium text-gray-600 lg:text-xl">Cancel anytime</li>
                                </ul>
                            </div>
                            <div className="mt-8 text-center md:mt-16">
                                <a href="#" title="" className="inline-flex items-center justify-center px-10 py-4 font-semibold text-white transition-all duration-200 rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:opacity-80 hover:opacity-80" role="button"> Create your account </a>
                                <p className="mt-4 text-sm text-gray-700">No Credit Card Required</p>
                            </div>
                        </div>

                        <div className="relative overflow-hidden bg-white border-2 border-gray-900 rounded-md shadow">
                            <div className="absolute top-3 right-3">
                                <svg className="w-6 h-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                            </div>

                            <div className="px-4 py-5 lg:p-8">
                                <p className="text-lg font-medium text-gray-500">1 Year</p>
                                <p className="mt-4 text-6xl font-bold text-black">$99</p>
                                <ul className="flex flex-col mt-8 space-y-1">
                                    <li className="text-base font-medium text-gray-900 lg:text-xl">Less than $2 a week</li>
                                    <li className="text-base font-medium text-gray-600 lg:text-xl">Billed every year</li>
                                    <li className="text-base font-medium text-gray-600 lg:text-xl">Cancel anytime</li>
                                </ul>
                            </div>
                            <div className="mt-8 text-center md:mt-16">
                                <a href="#" title="" className="inline-flex items-center justify-center px-10 py-4 font-semibold text-white transition-all duration-200 rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:opacity-80 hover:opacity-80" role="button"> Pay </a>

                            </div>
                        </div>
                    </div>


                </div>
            </section>

        </div>
    );
};

export default MemberShip;