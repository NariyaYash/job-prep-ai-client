import { Navigate } from "react-router";
import { useAuth, } from "../hooks/useAuth"

function Protected({ children }) {
    const { loading, user } = useAuth();
    // const navigate = useNavigate();

    if (loading) {
        return (<main className='loading-screen'>
            <div className="loader"></div>
        </main>)
    }

    if (!user) {
        return <Navigate to={'/login'} />
    }

    return children
}

export default Protected