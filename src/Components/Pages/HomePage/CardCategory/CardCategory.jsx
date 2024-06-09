import { Link } from "react-router-dom";
// import useAxiosPublic from "../../../../Hooks/Axiospablic/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";
import useMediAll from "../../../../Hooks/UseMedicinAll/useMediAll";



const CardCategory = () => {

    const [medicinAll] = useMediAll();
    console.log(medicinAll);

    // const find = medicinAll.find(medi => medi.category_name)
    // console.log(find);

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

    console.log('Categories:', categories);

    const uniqueCategories = Object.values(categories).slice(0, 6)
    console.log(uniqueCategories);




    return (
        <div>

            {/* Title section */}
            <div className="text-center mt-4 p-4">
                <h2 className="text-3xl font-bold">Medicin Category</h2>
            </div>

            {/* Card section */}
            <div className="mt-2 grid lg:grid-cols-3 md:grid-cols-2 gap-4 p-4 ">

                {
                    uniqueCategories.map((medi, index) => <div key={medi.category_name}>
                        <Link className="block rounded-lg p-4 shadow-sm shadow-indigo-100 hover:bg-blue-100 border-blue-100 bg-blue-50 border">
                            <img
                                alt=""
                                src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                className="h-56 w-full rounded-md object-cover"
                            />
                            <div>
                                {/* {
                                    medi.medicines.filter(medicin => <div key={medicin._id}>
                                        <img src={medicin.image_url} alt="" />
                                    </div>)
                                } */}
                            </div>

                            <div className="mt-2">
                                <dl>
                                    <div className="text-center text-2xl">
                                        <h2 className="text-black font-bold ">{medi.category_name}</h2>
                                    </div>
                                </dl>

                                <div className="p-2">
                                    <h2 className="text-lg font-medium">Category Number : <span className="text-fuchsia-700">0{index + 1}</span></h2>
                                </div>

                            </div>
                        </Link>
                    </div>)
                }

            </div>



        </div>
    );
};

export default CardCategory;