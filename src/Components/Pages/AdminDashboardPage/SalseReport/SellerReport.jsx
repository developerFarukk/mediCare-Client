
import React, { useState, useEffect, useRef } from 'react';
import { saveAs } from 'file-saver';
import { utils, write } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import useAxiosSecure from '../../../../Hooks/AxiosSecure/useAxiosSecure';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { Helmet } from 'react-helmet-async';
import html2canvas from 'html2canvas-pro';

const SalesReport = () => {
    const axiosSecure = useAxiosSecure();
    const [salesData, setSalesData] = useState([]);
    const [filteredSalesData, setFilteredSalesData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const tableRef = useRef(null);

    useEffect(() => {
        fetchSalesData();
    }, []);

    useEffect(() => {
        filterDataByDate();
    }, [startDate, endDate, salesData]);

    const fetchSalesData = async () => {
        try {
            const response = await axiosSecure.get('/payment');
            setSalesData(response.data);
        } catch (error) {
            console.error('Error fetching sales data:', error);
        }
    };

    const filterDataByDate = () => {
        const filteredData = salesData.filter(row => {
            const rowDate = new Date(row.date);
            const start = new Date(startDate);
            const end = new Date(endDate);

            if (startDate && endDate) {
                return rowDate >= start && rowDate <= end;
            } else if (startDate) {
                return rowDate >= start;
            } else if (endDate) {
                return rowDate <= end;
            } else {
                return true;
            }
        });

        setFilteredSalesData(filteredData);
    };

    const columns = React.useMemo(
        () => [
            { Header: 'SL No', accessor: 'SL No' },
            { Header: 'Buyer Email', accessor: 'email' },
            { Header: 'Seller Email', accessor: 'sellerEmail' },
            { Header: 'Medicine Name', accessor: 'menuItemName' },
            { Header: 'Medicine Price', accessor: 'idPrice' },
            { Header: 'Date', accessor: 'date' },
            { Header: 'Total Price', accessor: 'price' },
        ],
        []
    );

    const exportCSV = () => {
        const csvData = filteredSalesData.map((row, index) => ({
            'SL NO': index + 1,
            'Buyer Email': row.email,
            'Seller Email': row.sellerEmail.join(', '),
            'Medicine Name': row.menuItemName.join(', '),
            'Medicine Price': row.idPrice.join(', '),
            'Date': new Date(row.date).toLocaleDateString(),
            'Total Price': row.price
        }));
        const worksheet = utils.json_to_sheet(csvData);
        const csvBuffer = write({ Sheets: { data: worksheet }, SheetNames: ['data'] }, { bookType: 'csv', type: 'array' });
        saveAs(new Blob([csvBuffer], { type: 'text/csv' }), 'sales_report.csv');
    };

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Sales Report',
        sheet: 'Sales'
    });

    const generatePDF = async () => {
        const element = document.getElementById('content-id');
        const canvas = await html2canvas(element, {
            useCORS: true,
            scale: 2,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'letter',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = imgProps.width;
        const imgHeight = imgProps.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 0; // Align at the top of the page

        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save('invoice.pdf');
    };

    return (
        <div>
            <div>
                <Helmet>
                    <title>Seller Report | MediCare</title>
                </Helmet>
            </div>

            <div className="text-center">
                <h2 className="lg:text-4xl text-2xl font-bold p-4">Manage Sales Report</h2>
            </div>

            {/* Date Range Filter Section */}
            <div className="flex justify-center space-x-4 p-4">
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                        End Date
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                    />
                </div>
            </div>

            <div ref={tableRef} id="content-id" className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200  text-sm dark:divide-gray-700 dark:bg-gray-900 rounded-lg">
                    <thead className="bg-green-300">
                        <tr>
                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900 dark:text-white">SL</th>
                            <th className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900 dark:text-white">Buyer Email</th>
                            <th className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900 dark:text-white">Seller Email</th>
                            <th className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900 dark:text-white">Medicine Name</th>
                            <th className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900 dark:text-white">Medicine Price</th>
                            <th className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900 dark:text-white">Date</th>
                            <th className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900 dark:text-white">Total Price</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 p-1 dark:divide-gray-700">
                        {filteredSalesData.map((medi, index) => (
                            <tr className="hover:bg-blue-200" key={medi._id}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{index + 1}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{medi.email}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                                    {medi.sellerEmail?.map((seller, i) => (
                                        <div key={i}>{seller}</div>
                                    ))}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                                    {medi.menuItemName?.map((name, i) => (
                                        <div key={i}>{name}</div>
                                    ))}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                                    {medi.idPrice?.map((price, i) => (
                                        <div key={i} className="flex justify-end">${price}</div>
                                    ))}
                                </td>
                                <td className="items-center gap-2 justify-center p-1 text-end">
                                    <p>{new Date(medi.date).toLocaleDateString()}</p>
                                </td>
                                <td className="items-center gap-2 justify-center p-3 text-end">
                                    <p>${medi.price}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='flex gap-4 justify-center p-2'>
                <button className='btn btn-primary' onClick={exportCSV}>Export CSV</button>
                <button className='btn btn-primary' onClick={onDownload}>Export Excel</button>
                <button className='btn btn-primary' onClick={generatePDF}>Export PDF</button>
            </div>
        </div>
    );
};

export default SalesReport;
