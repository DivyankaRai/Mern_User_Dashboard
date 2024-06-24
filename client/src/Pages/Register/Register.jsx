import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify";
import './Register.css'; 

const Register = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate= useNavigate();

    const onSubmit = async (formData) => {
        setLoading(true);
        console.log(formData);
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('phone', formData.phone);
            data.append('password', formData.password);
            data.append('confirm_password', formData.confirm_password);
            data.append('photo', formData.photo[0]);

            const response = await axios.post('http://localhost:8000/register', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', response.data);
            toast.success('User logged in Successfully', {
                onClose: () => navigate('/login') 
            });

            reset();
        } catch (error) {
            console.error('Error:', error);
            toast.error('Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const password = watch('password');

    return (
        <div className="register-page">
            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                <h2 style={{"fontSize":"23px","fontWeight":"700","textAlign":"center","marginBottom":"20px"}}>Create your account</h2>
                <input
                    type="text"
                    placeholder="Enter your Name"
                    {...register('name', { required: true })}
                    className={`input-field ${errors.name ? 'error' : ''}`}
                />
                {errors.name && <div className="error-message">Name is required</div>}

                <input
                    type="text"
                    placeholder="Enter your Email"
                    {...register('email', { required: true })}
                    className={`input-field ${errors.email ? 'error' : ''}`}
                />
                {errors.email && (
                    <div className="error-message">
                        {errors.email.type === 'required' ? 'Email is required' : 'Invalid email format'}
                    </div>
                )}

                <input
                    type="text"
                    placeholder="Enter your Phone"
                    {...register('phone', { required: true })}
                    className={`input-field ${errors.phone ? 'error' : ''}`}
                />
                {errors.phone && <div className="error-message">Phone is required</div>}

                <input
                    type="password"
                    placeholder="Enter your Password"
                    {...register('password', { required: true })}
                    className={`input-field ${errors.password ? 'error' : ''}`}
                />
                {errors.password && <div className="error-message">Password is required</div>}

                <input
                    type="password"
                    placeholder="Enter your Confirm Password"
                    {...register('confirm_password', {
                        required: true,
                        validate: value => value === password || 'Passwords do not match'
                    })}
                    className={`input-field ${errors.confirm_password ? 'error' : ''}`}
                />
                {errors.confirm_password && (
                    <div className="error-message">
                        {errors.confirm_password.message}
                    </div>
                )}

                <input
                    type="file"
                    id="photo"
                    {...register('photo', { required: true })}
                    className={`input-field ${errors.photo ? 'error' : ''}`}
                />
                {errors.photo && <div className="error-message">Photo is required</div>}

                <button type="submit" className="submit-button" disabled={loading}>
                    Register
                </button>

                <div className="create-account-link">
                    Already signed up? <Link to="/login">Log in</Link>
                </div>
            </form>
            <ToastContainer position="top-center"/>
        </div>
    );
};

export default Register;
