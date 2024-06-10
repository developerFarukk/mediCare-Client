import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/AxiosSecure/useAxiosSecure";
import useAuth from "../../Hooks/UseAuth/useAuth";
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

import './invoice.css';
import logo from "../../assets/Rgister/RegisterImg.png";
import { Link } from "react-router-dom";

const Invoice = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = {} } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const { date, email, price, status, transactionId, _id, menuItemIds = [], idPrice = [] } = payments;

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
            <div id="content-id" className="p-6">
                <div id="invoice-box" className="invoice-box">
                    <table cellPadding="0" cellSpacing="0">
                        <tbody>
                            <tr className="top">
                                <td colSpan="2">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="title flex items-center gap-2">
                                                    <img src={logo} alt="Company Logo" className="h-16 w-16" />
                                                    <p>MadiCare</p>
                                                </td>
                                                <td>
                                                    Invoice #: {_id}<br />
                                                    Created: {new Date(date).toLocaleDateString()}<br />
                                                    Status: {status}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr className="information">
                                <td colSpan="2">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    Medicare LTD<br />
                                                    12345 Sunny Road<br />
                                                    Dhaka, 3000-D
                                                </td>
                                                <td>
                                                    {email}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr className="heading">
                                <td>Payment Method</td>
                                <td>Transaction ID</td>
                            </tr>
                            <tr className="details">
                                <td>Stripe</td>
                                <td>{transactionId}</td>
                            </tr>
                            <tr className="heading">
                                <td>Medicin ID</td>
                                <td>Price</td>
                            </tr>
                            {menuItemIds.map((item, index) => (
                                <tr className="item" key={index}>
                                    <td>{item}</td>
                                    <td>${idPrice[index]}</td>
                                </tr>
                            ))}
                            <tr className="total">
                                <td></td>
                                <td className="grid justify-end">
                                    <div className="flex gap-2">
                                        <h2>Total: $</h2>
                                        <h2>{price}</h2>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <div className="flex gap-4 justify-center p-4">
                <button className="btn btn-warning" onClick={generatePDF}>Download as PDF</button>
                <Link to="/"><button className="btn btn-primary">Back to Home</button></Link>
            </div>
        </div>
    );
};

export default Invoice;
