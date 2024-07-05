import { useState } from "react";
import { useSignup} from "../hooks/useSignup";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password);
        
    }

    return (
        <form className=" w-2/5 mx-auto my-4 py-5 px-16 bg-white flex flex-col" onSubmit={handleSubmit}>
            <h3 className="text-3xl text-center">Sign up</h3>

            <label htmlFor="">Email:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="mb-3 border rounded-md  border-gray-300 p-2"
                value={email}
            />

            <label htmlFor="">Password:</label>
            <input 
                type="password"
                className="mb-3 border rounded-md  border-gray-300 p-2"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading} className="bg-primary text-white mx-auto p-4 rounded-md">Sign up</button>
            {error && <div className="">{error}</div>}
        </form>
    )
}

export default Signup;