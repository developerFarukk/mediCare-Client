

const DiscountSlider = ({ discount }) => {

    console.log(discount);
    const { image_url, discount_percentage, item_name, category_name, company_name, per_unit_price } = discount;

    return (
        <div>
            <div className='grid justify-center discount-slider  items-center mx-24 my-16'>
                <div className="card w-96 bg-yellow-50 shadow-xl">
                    <figure className="rounded-md"><img className="p-4 " src={image_url} alt="Shoes" /></figure>
                    <p className="absolute right-0 mr-4 mt-4 px-4 bg-green-400 rounded-lg text-white">{discount_percentage}% OFF</p>
                    <div className="card-body flex flex-col items-center">
                        <h2 className="card-title">{item_name}</h2>
                        <div className="justify-start  text-start">
                            <p className="">Category : {category_name}</p>
                            <p className="">Company : {company_name}</p>
                            <p className="">Per Unit Price : $ {per_unit_price }</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountSlider;