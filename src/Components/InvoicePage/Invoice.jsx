import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/AxiosSecure/useAxiosSecure";
import useAuth from "../../Hooks/UseAuth/useAuth";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
import './invoice.css';



const Invoice = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })

    console.log(payments);

    const {  date, email, menuItemIds, price, status, transactionId, _id } = payments;

    // const generatePDF = () => {
    //     const invoice = document.getElementById('invoice');
    //     html2canvas(invoice).then((canvas) => {
    //         const imgData = canvas.toDataURL('image/png');
    //         const pdf = new jsPDF('p', 'mm', 'a4');
    //         const imgProps = pdf.getImageProperties(imgData);
    //         const pdfWidth = pdf.internal.pageSize.getWidth();
    //         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    //         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    //         pdf.save('invoice.pdf');
    //     });
    // };


    return (
        <div>
            {/* <div>
                <div className="invoice-box" id="invoice">
                    <table cellPadding="0" cellSpacing="0">
                        <tbody>
                            <tr className="top">
                                <td colSpan="2">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="title">
                                                    <img src="logo.png" alt="Company Logo" style={{ width: '100%', maxWidth: '300px' }} />
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
                                                    Your Company, Inc.<br />
                                                    12345 Sunny Road<br />
                                                    Sunnyville, TX 12345
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
                                <td>Item</td>
                                <td>Price</td>
                            </tr>
                            {menuItemIds.map((item, index) => (
                                <tr className="item" key={index}>
                                    <td>{item}</td>
                                    <td>${price.toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr className="total">
                                <td></td>
                                <td>Total: ${(price * menuItemIds.length).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button onClick={generatePDF}>Download as PDF</button>
            </div> */}
        </div>
    );
};

export default Invoice;