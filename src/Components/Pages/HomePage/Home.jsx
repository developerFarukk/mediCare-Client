import Bisness from "./BissnesSection/Bisness";
import CardCategory from "./CardCategory/CardCategory";
import Discount from "./DiscountSection/Discount";
import Footer from "./Footer/Footer";
import Preview from "./PreviewSection/Preview";
import Slider from "./Slider/Slider";



const Home = () => {
    return (
        <div>

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
                <div>
                    <p className="text-2xl text-white">Discount section</p>
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