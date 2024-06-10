import { useForm } from "react-hook-form";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../../Hooks/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";




const UpdateMedicin = () => {

    const medicinID = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    console.log(medicinID);

    const { category_name, image_url, per_unit_price, item_name, company_name, discount_percentage, item_generic_name, item_mass_unit, short_description, _id } = medicinID;



    const { register, handleSubmit,  formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        if (data.discount === undefined || data.discount === null) {
            data.discount = 0;
        }
        console.log(data);
        
        const { category, categotyImage, itemName, genericName, unitPrice, companyName, discount, massUnit, shortDescription  } = data;

        // send shop item to the database
        const medicinItem = {
            category,
            categotyImage,
            unitPrice,
            itemName,
            companyName,
            discount,
            genericName,
            massUnit,
            shortDescription,
            date: new Date()

        }
        const res = await axiosSecure.patch(`/medicin/${_id}`, medicinItem);
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
            // reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'Successfully updated to the medicin.',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/deshoard/catagory')
        }

    }



    return (
        <div>

            {/* Dynamic Title section */}
            <div>
                <Helmet>
                    <title> Update Medicin | MediCare</title>
                </Helmet>
            </div>

            {/* Updated section */}
            <div>
                <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                    <h2 className="text-xl text-center font-semibold text-gray-700  capitalize dark:text-white">Input Update medicin Information</h2>

                    {/* form section */}
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="grid  gap-6 mt-4 form-control">
                            <div className="form-control col-span-2">
                                <label className="text-gray-700 grid justify-start dark:text-gray-200 text-sm" >Item Name</label>
                                <input type="text" defaultValue={item_name} name="itemName" {...register("itemName", { required: false })} placeholder="Inpute item name" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                {errors?.itemName && <span className="text-red-600">Item Name is required</span>}
                            </div>

                            <div className="form-control col-span-2">
                                <label className=" grid text-gray-700 justify-start dark:text-gray-200 text-sm" >Generic Name</label>
                                <input type="text" defaultValue={item_generic_name} placeholder="Input Genieric Name" name="genericName" {...register("genericName", { required: false })} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div className="form-control col-span-2">
                                <label className=" grid text-gray-700 justify-start dark:text-gray-200 text-sm" >Category Image</label>
                                <input type="text" defaultValue={image_url} placeholder="Input category image" name="categotyImage" {...register("categotyImage", { required: false })} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div className="form-control">
                                <label className="text-gray-700 grid justify-start dark:text-gray-200 text-sm" >Item Mass Unit(Mg)</label>
                                <input type="text" defaultValue={item_mass_unit} name="massUnit" {...register("massUnit", { required: false })} placeholder="Inpute mass unit" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                {errors?.itemName && <span className="text-red-600">Mass unit is required</span>}
                            </div>

                            <div className="form-control">
                                <label className=" grid text-gray-700 justify-start text-sm dark:text-gray-200" >Per Unit Price</label>
                                <input type="text" name="unitPrice" defaultValue={per_unit_price} placeholder="Inpute price" {...register("unitPrice", {
                                    required: false,
                                    valueAsNumber: true,
                                    validate: {
                                        isNumber: value => !isNaN(value) || "Price must be a number",
                                        nonString: value => typeof value === "number" || "Price must be a number"
                                    }
                                })} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div className="form-control col-span-2">
                                <label className=" grid text-gray-700 justify-start text-sm dark:text-gray-200" >Discount percentage(Optional)</label>
                                <input type="number" name="discount" placeholder="Inpute discount" defaultValue={discount_percentage} {...register("discount", {
                                    valueAsNumber: true,
                                    validate: {
                                        isNumber: value => !isNaN(value) || "Discount must be a number",
                                        nonString: value => typeof value === "number" || "Discount must be a number"
                                    }
                                })} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div className="form-control col-span-2 ">
                                <label className=" grid text-gray-700 justify-start  text-sm dark:text-gray-200" >Short Description</label>
                                <textarea placeholder="Inpute short description" defaultValue={short_description} {...register("shortDescription", { required: false })} name="shortDescription" className="textarea textarea-bordered textarea-sm  max-w-xs
                            block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" ></textarea>
                            </div>

                            {/* Select category section */}
                            <select type="option" defaultValue={category_name} {...register("category", { required: false })} name="category" className="select-bordered select select-ghost w-full form-control col-span-2 text-base font-medium justify-start grid  text-[#151515] bg-white">
                                <option disabled selected>Select Category</option>
                                <option>Analgesic</option>
                                <option>Antiasthmatic</option>
                                <option>Statin</option>
                                <option>Diuretic</option>
                                <option>Antihypertensive</option>
                                <option>Corticosteroid</option>
                            </select>

                            {/* Select Company name */}
                            <select type="option" defaultValue={company_name} {...register("companyName", { required: false })} name="companyName" className="select-bordered select select-ghost col-span-2 w-full form-control text-base font-medium justify-start grid  text-[#151515] bg-white">
                                <option disabled selected> Company Name</option>
                                <option>Beximco</option>
                                <option>Squre</option>
                                <option>Heltcare</option>
                                <option>HealthMed</option>
                                <option>Aritropharma</option>
                                <option>MedLife</option>
                                <option>DiabCare</option>
                                <option>BioPharma</option>
                                <option>AquaMed</option>
                            </select>

                        </div>
                        <div className="flex justify-end mt-6 form-control">
                            <button type="submit" className=" px-8 py-2.5 leading-5  text-white transition-colors duration-300 tran700 rounded-md bg-gray-600 focus:outline-none focus:bg-gray-600">Update Medicine</button>
                        </div>
                    </form>

                </section>
            </div>

            <div className="grid justify-center p-2 mt-2">
                <Link to="/deshoard/catagory"><button className="btn btn-primary">Back to Manage Catagory</button></Link>
            </div>

        </div>
    );
};

export default UpdateMedicin;