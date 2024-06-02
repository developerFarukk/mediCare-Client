import Footer from "./Footer/Footer";
import Slider from "./Slider/Slider";



const Home = () => {
    return (
        <div>
            
            {/* Slider section */}
            <div>
                <Slider></Slider>
            </div>

            {/* Footer section */}
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Home;