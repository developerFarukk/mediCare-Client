

import React, { useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
import { saveAs } from 'file-saver';
import { utils, write } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType } from 'docx';
import useAxiosSecure from '../../../../Hooks/AxiosSecure/useAxiosSecure';


const SalesReport = () => {
    const axiosSecure = useAxiosSecure();
    const [salesData, setSalesData] = useState([]);
    const [pageSize, setPageSizeState] = useState(10);

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

    const exportExcel = () => {
        const excelData = salesData.map((row, index) => ({
            'SL NO': index + 1,
            'Buyer Email': row.email,
            'Seller Email': row.sellerEmail.join(', '),
            'Medicine Name': row.menuItemName.join(', '),
            'Medicine ID': row.menuItemIds.join(', '),
            'Medicine Price': row.idPrice.join(', '),
            'Date': new Date(row.date).toLocaleDateString(),
            'Total Price': row.price
        }));
        const worksheet = utils.json_to_sheet(excelData);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Sales Report');

        const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'sales_report.xlsx');
    };

    // console.log(salesData);

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['SL No', 'Buyer Email', 'Seller Email', 'Medicin Name', 'Medicin ID', 'Medicin Price', 'Date', 'Total Price']],
            body: salesData.map((row, index) => {
                // Flatten arrays to strings
                const sellerEmail = row.sellerEmail.join(', ');
                const menuItemName = row.menuItemName.join(', ');
                const menuItemIds = row.menuItemIds.join(', ');
                const idPrice = row.idPrice.join(', ');

                // Return row data
                return [
                    index + 1,
                    row.email,
                    sellerEmail,
                    menuItemName,
                    menuItemIds,
                    idPrice,
                    new Date(row.date).toLocaleDateString(),
                    row.price
                ];
            }),
        });
        doc.save('sales_report.pdf');
    };

    // const exportDOCX = () => {
    //     const doc = new Document();
    //     const tableRows = [
    //         new TableRow({
    //             children: [
    //                 new TableCell({ children: [new Paragraph('SL No')] }),
    //                 new TableCell({ children: [new Paragraph('Buyer Email')] }),
    //                 new TableCell({ children: [new Paragraph('Seller Email')] }),
    //                 new TableCell({ children: [new Paragraph('Medicin Name')] }),
    //                 new TableCell({ children: [new Paragraph('Medicin ID')] }),
    //                 new TableCell({ children: [new Paragraph('Medicin Price')] }),
    //                 new TableCell({ children: [new Paragraph('Date')] }),
    //                 new TableCell({ children: [new Paragraph('Total Price')] }),
    //             ],
    //         }),
    //     ];

    //     salesData.forEach((row, index) => {
    //         tableRows.push(
    //             new TableRow({
    //                 children: [
    //                     new TableCell({ children: [new Paragraph(index + 1)] }),
    //                     new TableCell({ children: [new Paragraph(row.email)] }),
    //                     new TableCell({ children: [new Paragraph(row.sellerEmail.join(', '))] }),
    //                     new TableCell({ children: [new Paragraph(row.menuItemName.join(', '))] }),
    //                     new TableCell({ children: [new Paragraph(row.menuItemIds.join(', '))] }),
    //                     new TableCell({ children: [new Paragraph(row.idPrice.join(', '))] }),
    //                     new TableCell({ children: [new Paragraph(new Date(row.date).toLocaleDateString())] }),
    //                     new TableCell({ children: [new Paragraph(row.price)] }),
    //                 ],
    //             })
    //         );
    //     });

    //     const table = new Table({
    //         rows: tableRows,
    //         width: {
    //             size: 100,
    //             type: WidthType.PERCENTAGE,
    //         },
    //     });

    //     doc.addSection({
    //         children: [table],
    //     });

    //     Packer.toBlob(doc).then(blob => {
    //         saveAs(blob, 'sales_report.docx');
    //     });
    // };

    const exportDOCX = () => {
        const doc = new Document();

        // Add a title to the document
        doc.addSection({
            properties: {},
            children: [
                new Paragraph({
                    text: "Sales Report",
                    heading: HeadingLevel.TITLE,
                    alignment: AlignmentType.CENTER,
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
            <div className='justify-end flex'>
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
            <div className="overflow-x-auto">
                <table {...getTableProps()}
                    className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900 rounded-lg"
                >
                    <thead className="">
                        <tr>
                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900 dark:text-white">SL No</th>
                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900 dark:text-white">Buyer Email</th>
                            <th className="whitespace-nowrap px-4 text-start py-2 font-medium text-gray-900 dark:text-white">
                                Seller Email
                            </th>
                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900 dark:text-white">Medicin Name</th>
                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900 dark:text-white">Medicin ID</th>
                            <th className="whitespace-nowrap px-4 text-start py-2 font-medium text-gray-900 dark:text-white">
                                Medicin Price
                            </th>
                            <th className="whitespace-nowrap px-4 text-center py-2 font-medium text-gray-900 dark:text-white">
                                Date
                            </th>
                            <th className="whitespace-nowrap px-4 text-center py-2 font-medium text-gray-900 dark:text-white">
                                Total Price
                            </th>

                        </tr>
                    </thead>

                    <tbody {...getTableBodyProps()} className="divide-y divide-gray-200 dark:divide-gray-700">

                        {
                            page.map((medi, index) => <tr className="hover:bg-gray-200" key={medi._id}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                    {index + 1}
                                </td>

                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{medi.original.name}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                                    {medi.original.sellerEmail?.map(seller => <td key={index} className='flex'>
                                        {seller}
                                    </td>)}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                                    {medi.original.menuItemName?.map(seller => <td key={index} className='flex'>
                                        {seller}
                                    </td>)}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                                    {medi.original.menuItemIds?.map(seller => <td key={index} className='flex'>
                                        {seller}
                                    </td>)}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                                    {medi.original.idPrice?.map(seller => <td key={index} className='flex justify-end'>
                                        $ {seller}
                                    </td>)}
                                </td>
                                <td className="items-center gap-2 justify-center p-1 text-end ">
                                    <p>{new Date(medi.original.date).toLocaleDateString()}</p>
                                </td>
                                <td className="items-center gap-2 justify-center p-1 text-end ">
                                    <p>$ {medi.original.price}</p>
                                </td>
                            </tr>)
                        }

                        {/* <tr>

                        </tr> */}


                    </tbody>
                </table>
            </div>

            {/* <thead>
                    {headerGroups.map(headerGroup => (
                        <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th key={column.id} {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead> */}

            {/* <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr key={row.id} {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td key={cell.column.id} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody> */}

            <div className='flex gap-4 justify-center p-2 '>
                <button className='btn btn-primary' onClick={exportCSV}>Export CSV</button>
                <button className='btn btn-primary' onClick={exportExcel}>Export Excel</button>
                <button className='btn btn-primary' onClick={exportPDF}>Export PDF</button>
                <button className='btn btn-primary' onClick={exportDOCX}>Export DOCX</button>
            </div>
        </div>
    );
};

export default SalesReport;
