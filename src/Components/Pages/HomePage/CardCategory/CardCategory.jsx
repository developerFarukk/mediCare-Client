
// import useAxiosPublic from "../../../../Hooks/Axiospablic/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";
import useMediAll from "../../../../Hooks/UseMedicinAll/useMediAll";
import SubCardCategory from "./SubCardCategory";



const CardCategory = () => {

    const [medicinAll] = useMediAll();
    console.log(medicinAll);


    const categories = medicinAll.reduce((acc, medi) => {
        if (!acc[medi.category_name]) {
            acc[medi.category_name] = {
                category_name: medi.category_name,
                medicines: [],
            };
        }
        acc[medi.category_name].medicines.push(medi);
        return acc;
    }, {});

    // console.log('Categories:', categories);

    const uniqueCategories = Object.values(categories).slice(0, 6)
    // console.log(uniqueCategories);




    return (
        <div>

            {/* Title section */}
            <div className="text-center mt-4 p-4">
                <h2 className="text-3xl font-bold">Medicin Category</h2>
            </div>

            {/* Card section */}
            <div className="mt-2 grid lg:grid-cols-3 md:grid-cols-2 gap-4 p-4 ">

                {uniqueCategories.map(category => (
                    <SubCardCategory key={category.category_name} category={category}></SubCardCategory>
                ))}

            </div>



        </div>
    );
};

export default CardCategory;