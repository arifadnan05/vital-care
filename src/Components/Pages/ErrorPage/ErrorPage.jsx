import { Link } from "react-router-dom";
import errorImg from "../../../../public/error.json"
import Lottie from "lottie-react";

const ErrorPage = () => {


    return (
        <div className="mx-auto container">

            <section className="">
                <Lottie animationData={errorImg} loop={true} className="object-contain lg:mt-5 h-96  " />

                <div className="container mx-auto  lg:-mt-4 ">
                    <div className="row">
                        <div className="col-sm-12 ">
                            <div className="col-sm-10 col-sm-offset-1  text-center">
                                <div className="four_zero_four_bg">
                                    <h2 className="mb-16 font-extrabold text-9xl  ">
                                        <span className="sr-only ">Error</span>404
                                    </h2>
                                </div>

                                <div className="contant_box_404">
                                    <p className="text-2xl font-semibold md:text-3xl">Sorry, we could not find this page.</p>

                                    <p className="mt-4 mb-8 font-semibold dark:text-gray-600">But don t worry, you can find plenty of other things on our homepage.</p>

                                    <Link to='/' className="inline-flex items-center mt-4 lg:ml-24 justify-center w-full px-4 py-3 text-base font-bold leading-6 text-white  border-transparent rounded-full md:w-auto hover:bg-indigo-500 bg-indigo-600 hover:bg-transparent hover:outline hover:text-black    transition duration-500 ease-in-out">
                                        Back to Home
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ErrorPage;
