import ShopBanner from "./ShopBanner/ShopBanner";
import ShopTable from "./ShopTable/ShopTable";




const Shop = () => {
    return (
        <div>

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