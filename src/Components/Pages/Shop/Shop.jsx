import ShopBanner from "./ShopBanner/ShopBanner";
import ShopCard from "./ShopCard/ShopCard";



const Shop = () => {
    return (
        <div>

            {/* shop Banner Section */}
            <div>
                <ShopBanner></ShopBanner>
            </div>

            {/* Shop Card section */}
            <div>
                <ShopCard></ShopCard>
            </div>

            

        </div>
    );
};

export default Shop;