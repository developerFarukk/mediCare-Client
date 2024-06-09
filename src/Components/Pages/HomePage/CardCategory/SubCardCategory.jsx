import { useNavigate } from "react-router-dom";


const SubCardCategory = ({ category }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/category/${category.category_name}`, { state: { medicines: category.medicines } });
    };

    return (
        <div>
            <div onClick={handleClick} className="block rounded-lg p-4 shadow-sm shadow-indigo-100 hover:bg-blue-100 border-blue-100 bg-blue-50 border">

                {category.medicines.map(medicin => (
                    <div key={medicin._id}>
                        <img
                            alt={medicin.name}
                            src={medicin.image_url}
                            className="h-56 w-full rounded-md object-cover"
                        />
                    </div>
                )).slice(0, 1)}



                <div className="mt-2">
                    <dl>
                        <div className="text-center text-2xl">
                            <h2 className="text-black font-bold ">{category.category_name}</h2>
                        </div>
                    </dl>

                    <div className="p-2">
                        <h2 className="text-lg font-medium">Total Category Medicin : <span className="text-fuchsia-700">{category.medicines.length}</span></h2>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SubCardCategory;