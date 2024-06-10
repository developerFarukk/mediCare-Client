


const CartBanner = () => {
    return (
        <div>
            <section className="pt-10 overflow-hidden  md:pt-0  sm:pt-16 2xl:pt-16">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid items-center grid-cols-1 md:grid-cols-2">
                        <div>
                            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Hey 👋 I am <br className="block sm:hidden" />Jenny Carter</h2>
                            <p className="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">A clearly visible and accessible Checkout button guides users to the payment and shipping information section. If certain conditions, such as a minimum total price, are not met, the checkout button should be disabled with an appropriate message, ensuring users are aware of what they need to do to proceed.</p>

                            <p className="mt-4 text-xl text-gray-600 md:mt-8">
                                <span className="relative inline-block">
                                    <span className="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300"></span>
                                    <span className="relative"> You must be select total Price minimum $0.5 ? </span>
                                </span>
                                <br className="block sm:hidden" />Then continu <a href="#" title="" className="transition-all duration-200 text-sky-500 hover:text-sky-600 hover:underline">Checkout</a>
                            </p>
                        </div>

                        <div className="relative">
                            <img className="absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg" alt="" />

                            <img className="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/business-woman.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default CartBanner;