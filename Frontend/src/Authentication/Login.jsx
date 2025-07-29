import React from 'react';

const Login = () => {
    return (
        <div className="flex h-screen">
            {/* Left Image Section */}
            <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/featured/?technology')" }}>
                
            </div>

            
            <div className="w-1/2 flex items-center justify-center">
                <div className="w-full max-w-md p-8 bg-white rounded shadow">
                    <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
                    <form className="flex flex-col gap-4">
                        <input className="p-3 border border-gray-300 rounded" type="email" placeholder="Email" />
                        <input className="p-3 border border-gray-300 rounded" type="password" placeholder="Password" />
                        <button className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700" type="submit">Login</button>
                        <p className="text-center text-sm">
                            Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
