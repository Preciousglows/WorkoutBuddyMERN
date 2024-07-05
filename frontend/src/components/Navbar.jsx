import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }
    return (
        <header className=" py-6 px-7 bg-white flex justify-between">
            <div>
                <Link to={"/"}>
                    <h1 className="text-3xl font-bold">Workout Buddy</h1>
                </Link>
            </div>

            <nav className="flex gap-4 items-center">
               { user && (<div className="flex gap-4 items-center">
                    <span>{user.email}</span>
                    <button onClick={handleClick} className="font-bold border-primary px-3 py-2 border rounded-md text-primary">Log out</button>
                </div>
               )}

              { !user && (  <div className="flex gap-4">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </div>
               )}
            </nav>   
        </header>
    )
}

export default Navbar;