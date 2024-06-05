import { Link } from "react-router-dom";



const Error = () => {
    return (
        <div>
            <p>THis is 404 </p>
            <Link to="/"><button className="btn btn-warning">Back to Home</button></Link>
        </div>
    );
};

export default Error;