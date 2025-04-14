import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import hideIcon from '../../assets/icons/hide.png';
import showIcon from '../../assets/icons/show.png';
import useAuthStore from "../../store/authStore.js";

const Login = () => {
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');
        setErrors({});

        const newErrors = {};
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( { body: {email, password} }),
            });

            const data = await response.json();
            const { accessToken, expiresIn  } = data?.result?.data;

            if (response.ok && accessToken) {
                setAuth({accessToken, expiresIn });

                navigate('/dashboard');
            } else {
                setApiError('Invalid email or password');
            }
        } catch {
            setApiError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center"
                                tabIndex={-1}
                            >
                                <img
                                    src={showPassword ? hideIcon : showIcon}
                                    alt={showPassword ? 'Hide password' : 'Show password'}
                                    className="w-5 h-5"
                                />
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {apiError && <p className="text-red-600 text-sm mb-4 text-center">{apiError}</p>}

                    <div className="flex justify-center mt-4">
                        <Button
                            type="submit"
                            title={loading ? 'Logging in...' : 'Login'}
                            textColor="text-white"
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;