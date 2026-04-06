import { useLocation, useNavigate } from "react-router";
import "../../AppLayout.scss"; 

const NotFound = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isInvalidInterview = location.state?.type === "invalid-interview";

    return (
        <div className="not-found">
            <div className="not-found-content">
                <h1>404 - Page Not Found</h1>
                {isInvalidInterview ? (
                    <p>The interview ID you are looking for does not exist or is invalid.</p>
                ) : (
                    <p>The page you are looking for does not exist.</p>
                )}
                <button className="btn-primary" onClick={() => navigate("/")}>
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;