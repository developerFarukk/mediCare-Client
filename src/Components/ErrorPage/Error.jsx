import { Link } from "react-router-dom";



const Error = () => {
    return (
        <div>
            <section className=" ">
                <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
                    <div className="w-full lg:w-1/2">
                        <p className="text-4xl font-medium text-blue-500 dark:text-blue-400">404 error</p>
                        <h1 className="mt-3 text-4xl font-bold text-gray-800 dark:text-white md:text-3xl">
                            Page not found
                        </h1>
                        <p className="mt-4 text-gray-500 text-2xl dark:text-gray-400">
                            Sorry, the page you are looking for does not exist. Here are some helpful links:
                        </p>
                        <div className="flex items-center justify-center mt-6 gap-x-3">
                            <Link to={"/"}>
                                <button className="btn btn-warning">Back to Home</button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
                        <img
                            className="w-full max-w-lg lg:mx-auto rounded-lg"
                            src="https://webartdevelopers.com/blog/wp-content/uploads/2018/09/404-SVG-Animated-Page-Concept.png"
                            alt=""
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Error;