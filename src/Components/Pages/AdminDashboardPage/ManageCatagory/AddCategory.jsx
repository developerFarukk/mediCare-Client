import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/AxiosSecure/useAxiosSecure";
import { toast } from "react-toastify";
import useMediAll from "../../../../Hooks/UseMedicinAll/useMediAll";



const AddCategory = ( { onSuccess } ) => {

    const axiosSecure = useAxiosSecure();
    const [, refetch] = useMediAll();

    const { register, handleSubmit, reset, formState: { errors } } = useForm(
        {
            defaultValues: {
                discount: 0
            }
        }
    );





    const onSubmit = async (data) => {
        if (data.discount === undefined || data.discount === null) {
            data.discount = 0;
        }
        console.log(data);

            // send shop item to the database
            const medicinItem = {
                category_name: data.category,
                image_url: data.categotyImage,
                per_unit_price: data.unitPrice,
                item_name: data.itemName,
                company_name: data.companyName,
                discount_percentage: data.discount,
                item_generic_name: data.genericName,
                item_mass_unit: data.massUnit,
                short_description: data.shortDescription,
                date: new Date()

            }
            const res = await axiosSecure.post('/medicin', medicinItem);
            console.log('medicin Item saved', res.data);

                    if (res.data.acknowledged === true ) {
                        toast.success('Medicin data added successfuly')
                        reset();
                        refetch();
                        onSuccess()
                    }

    }




    return (
        <div>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 className="text-sm text-center font-semibold text-gray-700 capitalize dark:text-white">Input Category details</h2>

                {/* form section */}
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="grid  gap-6 mt-4 form-control">
                        <div className="form-control col-span-2">
                            <label className="text-gray-700 grid justify-start dark:text-gray-200 text-sm" >Item Name</label>
                            <input type="text" name="itemName" {...register("itemName", { required: true })} placeholder="Inpute item name" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            {errors?.itemName && <span className="text-red-600">Item Name is required</span>}
                        </div>

                        <div className="form-control col-span-2">
                            <label className=" grid text-gray-700 justify-start dark:text-gray-200 text-sm" >Generic Name</label>
                            <input type="text" placeholder="Input Genieric Name" name="genericName" {...register("genericName", { required: false })} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div className="form-control col-span-2">
                            <label className=" grid text-gray-700 justify-start dark:text-gray-200 text-sm" >Category Image</label>
                            <input type="text" placeholder="Input category image" name="categotyImage" {...register("categotyImage", { required: false })} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div className="form-control">
                            <label className="text-gray-700 grid justify-start dark:text-gray-200 text-sm" >Item Mass Unit(Mg)</label>
                            <input type="text" name="massUnit" {...register("massUnit", { required: true })} placeholder="Inpute mass unit" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            {errors?.itemName && <span className="text-red-600">Mass unit is required</span>}
                        </div>

                        <div className="form-control">
                            <label className=" grid text-gray-700 justify-start text-sm dark:text-gray-200" >Per Unit Price</label>
                            <input type="text" name="unitPrice" placeholder="Inpute price" {...register("unitPrice", {
                                required: "Price is required",
                                valueAsNumber: true,
                                validate: {
                                    isNumber: value => !isNaN(value) || "Price must be a number",
                                    nonString: value => typeof value === "number" || "Price must be a number"
                                }
                            })} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div className="form-control col-span-2">
                            <label className=" grid text-gray-700 justify-start text-sm dark:text-gray-200" >Discount percentage(Optional)</label>
                            <input type="number" name="discount" placeholder="Inpute discount" defaultValue={0} {...register("discount", {
                                valueAsNumber: true,
                                validate: {
                                    isNumber: value => !isNaN(value) || "Discount must be a number",
                                    nonString: value => typeof value === "number" || "Discount must be a number"
                                }
                            })} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div className="form-control col-span-2 ">
                            <label className=" grid text-gray-700 justify-start  text-sm dark:text-gray-200" >Short Description</label>
                            <textarea placeholder="Inpute short description" {...register("shortDescription", { required: false })} name="shortDescription" className="textarea textarea-bordered textarea-sm  max-w-xs
                            block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" ></textarea>
                        </div>

                        {/* Select category section */}
                        <select type="option" {...register("category", { required: true })} name="category" className="select-bordered select select-ghost w-full form-control col-span-2 text-base font-medium justify-start grid  text-[#151515] bg-white">
                            <option disabled selected>Select Category</option>
                            <option>Analgesic</option>
                            <option>Antiasthmatic</option>
                            <option>Statin</option>
                            <option>Diuretic</option>
                            <option>Antihypertensive</option>
                            <option>Corticosteroid</option>
                        </select>

                        {/* Select Company name */}
                        <select type="option" {...register("companyName", { required: true })} name="companyName" className="select-bordered select select-ghost col-span-2 w-full form-control text-base font-medium justify-start grid  text-[#151515] bg-white">
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
                        <button type="submit" className=" px-8 py-2.5 leading-5  text-white transition-colors duration-300 tran700 rounded-md bg-gray-600 focus:outline-none focus:bg-gray-600">Add Category</button>
                    </div>
                </form>


            </section>
        </div>
    );
};


export default AddCategory;