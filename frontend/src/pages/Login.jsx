import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    }

    return (
        <form className=" w-2/5 mx-auto my-4 py-5 px-16 bg-white flex flex-col" onSubmit={handleSubmit}>
            <h3 className="text-3xl text-center">Login in</h3>

            <label htmlFor="">Email:</label>
            <input 
                type="email"
                className="mb-3 border rounded-md  border-gray-300 p-2"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label htmlFor="">Password:</label>
            <input 
                type="password"
                className="mb-3 border rounded-md  border-gray-300 p-2"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading} className="bg-primary text-white mx-auto p-4 rounded-md">Login</button>
            {error && <div className="">{error}</div>}
        </form>
    )
}

export default Login;