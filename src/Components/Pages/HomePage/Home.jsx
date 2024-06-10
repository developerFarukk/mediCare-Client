import { Helmet } from "react-helmet-async";
import Bisness from "./BissnesSection/Bisness";
import CardCategory from "./CardCategory/CardCategory";
import Discount from "./DiscountSection/Discount";
import Preview from "./PreviewSection/Preview";
import Slider from "./Slider/Slider";



const Home = () => {
    return (
        <div>

            {/* Dynamic Title section */}
            <div>
                <Helmet>
                    <title>Home | MediCare</title>
                </Helmet>
            </div>

            {/* Slider section */}
            <div>
                <Slider></Slider>
            </div>

            {/* Category Card section */}
            <div>
                <CardCategory></CardCategory>
            </div>

            {/* discount section */}
            <div>

                {/* Title section */}
                <div className="text-center mt-4 p-4">
                    <h2 className="text-3xl font-bold">Discount Medicin</h2>
                </div>

                <div >
                    <Discount></Discount>
                </div>
            </div>

            {/* Bisness Inspriretion section */}
            <div>
                <Bisness></Bisness>
            </div>

            {/* Preview section */}
            <div>
                <Preview></Preview>
            </div>

        </div>
    );
};

export default Home;