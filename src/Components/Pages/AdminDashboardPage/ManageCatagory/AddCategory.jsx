import { useForm } from "react-hook-form";



const AddCategory = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
        reset({ discount: 0 });
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
                            <input type="text" placeholder="Input Genieric Name" name="categotyImage" {...register("categotyImage", { required: false })} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div className="form-control">
                            <label className="text-gray-700 grid justify-start dark:text-gray-200 text-sm" >Item Mass Unit(Mg)</label>
                            <input type="text" name="massUnit" {...register("massUnit", { required: true })} placeholder="Inpute mass unit"  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            {errors?.itemName && <span className="text-red-600">Mass unit is required</span>}
                        </div>

                        <div className="form-control">
                            <label className=" grid text-gray-700 justify-start text-sm dark:text-gray-200" >Per Unit Price</label>
                            <input type="text" name="unitPrice" placeholder="Inpute price" {...register("unitPrice", { required: false })} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>
                        <div className="form-control col-span-2">
                            <label className=" grid text-gray-700 justify-start text-sm dark:text-gray-200" >Discount percentage(Optional)</label>
                            <input type="number" name="discount" placeholder="Inpute discount" defaultValue={0} {...register("discount", { valueAsNumber: true })} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div className="form-control col-span-2 ">
                            <label className=" grid text-gray-700 justify-start  text-sm dark:text-gray-200" >Short Description</label>
                            <textarea placeholder="Inpute short description" {...register("shortDescription", { required: false })} name="shortDescription" className="textarea textarea-bordered textarea-sm  max-w-xs
                            block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" ></textarea>
                        </div>

                        {/* Select category section */}
                        <select type="option" {...register("category", { required: true })} name="category" className="select-bordered select select-ghost w-full form-control col-span-2 text-base font-medium justify-start grid  text-[#151515] bg-white">
                            <option disabled selected>Select Category</option>
                            <option>Tablet</option>
                            <option>Serup</option>
                            <option>Cream</option>
                            <option>Vitamin</option>
                        </select>

                        {/* Select Company name */}
                        <select type="option" {...register("companyName", { required: true })} name="companyName" className="select-bordered select select-ghost col-span-2 w-full form-control text-base font-medium justify-start grid  text-[#151515] bg-white">
                            <option disabled selected> Company Name</option>
                            <option>Beximco</option>
                            <option>Squre</option>
                            <option>Heltcare</option>
                            <option>Tobado</option>
                            <option>Aritropharma</option>
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