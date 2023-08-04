import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext";

export const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }

    return (
        <header>
            <div className="container">
                <Link to='/'><h1>My Gym</h1></Link>
                <nav>
                    {!user && ( <div>
                        <Link to="/login">Log In</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                    )}
                    {user && ( 
                    <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Logout</button>
                    </div>
                    )}
                </nav>
            </div>
        </header>
    )
}