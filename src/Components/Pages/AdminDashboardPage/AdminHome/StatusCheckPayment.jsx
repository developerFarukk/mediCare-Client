

const StatusCheckPayment = ({ status }) => {

    console.log(status);

    return (
        <div className="w-full mt-4 px-4 py-3 hover:bg-blue-50 bg-white rounded-md shadow-md dark:bg-gray-800">
            <div>
                <h1 className="uppercase text-center font-bold">Total Medicin {status.status}</h1>
                <h2 className="text-center text-4xl mb-5 font-bold mt-4">{status.medicines.length}</h2>
            </div>
        </div>
    );
};

export default StatusCheckPayment;