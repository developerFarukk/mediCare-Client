import { Helmet } from "react-helmet-async";
import ShopBanner from "./ShopBanner/ShopBanner";
import ShopTable from "./ShopTable/ShopTable";




const Shop = () => {
    return (
        <div>

            {/* Dynamic Title section */}
            <div>
                <Helmet>
                    <title> Shop | MediCare</title>
                </Helmet>
            </div>

            {/* shop Banner Section */}
            <div>
                <ShopBanner></ShopBanner>
            </div>

            {/* Shop Card section */}
            <div>
                <ShopTable></ShopTable>
            </div>
        </div>
    );
};

export default Shop;