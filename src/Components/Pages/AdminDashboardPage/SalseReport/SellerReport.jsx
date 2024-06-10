


import React, { useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
import { saveAs } from 'file-saver';
import { utils, write } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType } from 'docx';
import useAxiosSecure from '../../../../Hooks/AxiosSecure/useAxiosSecure';
import html2canvas from 'html2canvas-pro';

import { useRef } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';


const SalesReport = () => {
    const axiosSecure = useAxiosSecure();
    const [salesData, setSalesData] = useState([]);
    const [pageSize, setPageSizeState] = useState(10);

    const tableRef = useRef(null);

    useEffect(() => {
        fetchSalesData();
    }, []);

    console.log(salesData);

    const fetchSalesData = async () => {
        try {
            const response = await axiosSecure.get('/payment'); // Adjust the endpoint as needed
            setSalesData(response.data);
        } catch (error) {
            console.error('Error fetching sales data:', error);
        }
    };


    const columns = React.useMemo(
        () => [
            { Header: 'SL No', accessor: 'SL No' },
            { Header: 'Buyer Email', accessor: 'buyerEmail' },
            { Header: 'Seller Email', accessor: 'sellerEmail' },
            { Header: 'Medicine Name', accessor: 'menuItemName' },
            { Header: 'Medicine ID', accessor: 'menuItemIds' },
            { Header: 'Medicine Price', accessor: 'idPrice' },
            { Header: 'Date', accessor: 'date' },
            { Header: 'Total Price', accessor: 'price' },

        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        page,
        setPageSize,
        state: { pageSize: statePageSize },
    } = useTable(
        {
            columns,
            data: salesData,
            initialState: { pageIndex: 0, pageSize },
        },
        usePagination
    );

    const handleSetPageSize = (size) => {
        setPageSize(size);
        setPageSizeState(size);
    };


    const exportCSV = () => {
        const csvData = salesData.map((row, index) => ({
            'SL NO': index + 1,
            'Buyer Email': row.email,
            'Seller Email': row.sellerEmail.join(', '),
            'Medicine Name': row.menuItemName.join(', '),
            'Medicine ID': row.menuItemIds.join(', '),
            'Medicine Price': row.idPrice.join(', '),
            'Date': new Date(row.date).toLocaleDateString(),
            'Total Price': row.price
        }));
        const worksheet = utils.json_to_sheet(csvData);
        const csvBuffer = write({ Sheets: { data: worksheet }, SheetNames: ['data'] }, { bookType: 'csv', type: 'array' });
        saveAs(new Blob([csvBuffer], { type: 'text/csv' }), 'sales_report.csv');
    };

    // Export Excel file
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Users table',
        sheet: 'Users'
    })

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

    const exportDOCX = () => {
        const doc = new Document();

        // Add a title to the document
        doc.addSection({
            properties: {},
            children: [
                new Paragraph({
                    text: "Sales Report",
                    // heading: HeadingLevel.TITLE,
                    // alignment: AlignmentType.CENTER,
                }),
            ],
        });

        // Create table rows for headers and data
        const tableRows = [
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph('SL No')] }),
                    new TableCell({ children: [new Paragraph('Buyer Email')] }),
                    new TableCell({ children: [new Paragraph('Seller Email')] }),
                    new TableCell({ children: [new Paragraph('Medicine Name')] }),
                    new TableCell({ children: [new Paragraph('Medicine ID')] }),
                    new TableCell({ children: [new Paragraph('Medicine Price')] }),
                    new TableCell({ children: [new Paragraph('Date')] }),
                    new TableCell({ children: [new Paragraph('Total Price')] }),
                ],
            }),
        ];

        salesData.forEach((row, index) => {
            const sellerEmail = row.sellerEmail ? row.sellerEmail.join(', ') : '';
            const menuItemName = row.menuItemName ? row.menuItemName.join(', ') : '';
            const menuItemIds = row.menuItemIds ? row.menuItemIds.join(', ') : '';
            const idPrice = row.idPrice ? row.idPrice.join(', ') : '';

            tableRows.push(
                new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph((index + 1).toString())] }),
                        new TableCell({ children: [new Paragraph(row.email)] }),
                        new TableCell({ children: [new Paragraph(sellerEmail)] }),
                        new TableCell({ children: [new Paragraph(menuItemName)] }),
                        new TableCell({ children: [new Paragraph(menuItemIds)] }),
                        new TableCell({ children: [new Paragraph(idPrice)] }),
                        new TableCell({ children: [new Paragraph(new Date(row.date).toLocaleDateString())] }),
                        new TableCell({ children: [new Paragraph(row.price.toString())] }),
                    ],
                })
            );
        });

        const table = new Table({
            rows: tableRows,
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },
        });

        doc.addSection({
            children: [table],
        });

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, 'sales_report.docx');
        });
    };


    console.log(page);

    return (
        <div>
            {/* Titel section */}
            <div className="text-center">
                <h2 className="lg:text-4xl text-2xl font-bold p-4"> Manage Seles Report </h2>
            </div>

            {/* Filter section */}
            <div className='justify-end flex p-2'>
                <select
                    className='rounded-lg'
                    value={statePageSize}
                    onChange={e => handleSetPageSize(Number(e.target.value))}
                >
                    {[10, 20, 30, 40, 50, 100].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table Section */}


            {/* Table section */}
            <div ref={tableRef} id="content-id" className="overflow-x-auto">
                <table {...getTableProps()} className="min-w-full divide-y-2 divide-gray-200  text-sm dark:divide-gray-700 dark:bg-gray-900 rounded-lg">
                    <thead className="bg-green-300">
                        <tr>
                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900 dark:text-white">SL</th>
                            <th className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900 dark:text-white">Buyer Email</th>
                            <th className="whitespace-nowrap   px-4 text-center py-2 font-medium text-gray-900 dark:text-white">Seller Email</th>
                            <th className="whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900 dark:text-white">Medicin ID</th>
                            <th className="whitespace-nowrap px-4 text-start py-2 font-medium text-gray-900 dark:text-white">Medicin Price</th>
                            <th className="whitespace-nowrap px-4 text-center py-2 font-medium text-gray-900 dark:text-white">Date</th>
                            <th className="whitespace-nowrap px-4 text-center py-2 font-medium text-gray-900 dark:text-white">Total Price</th>
                        </tr>
                    </thead>
                    <tbody {...getTableBodyProps()} className="divide-y divide-gray-200 p-1 dark:divide-gray-700">
                        {page.map((medi, index) => (
                            <tr className="hover:bg-blue-200" key={medi._id}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{index + 1}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{medi.original.email}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                                    {medi.original.sellerEmail?.map((seller, i) => (
                                        <div key={i}>{seller}</div>
                                    ))}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                                    {medi.original.menuItemIds?.map((id, i) => (
                                        <div key={i}>{id}</div>
                                    ))}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                                    {medi.original.idPrice?.map((price, i) => (
                                        <div key={i} className="flex justify-end">${price}</div>
                                    ))}
                                </td>
                                <td className="items-center gap-2 justify-center p-1 text-end">
                                    <p>{new Date(medi.original.date).toLocaleDateString()}</p>
                                </td>
                                <td className="items-center gap-2 justify-center p-3 text-end">
                                    <p>${medi.original.price}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div className='flex gap-4 justify-center p-2 '>
                <button className='btn btn-primary' onClick={exportCSV}>Export CSV</button>
                <button className='btn btn-primary' onClick={onDownload}>Export Excel</button>
                <button className='btn btn-primary' onClick={generatePDF}>Export PDF</button>
                <button className='btn btn-primary' onClick={exportDOCX}>Export DOCX</button>
            </div>
        </div>
    );
};

export default SalesReport;
