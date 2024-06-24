import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/actions/userActions'; 
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import './Login.css';

const Login = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);

  axios.defaults.withCredentials = true;

  const onSubmit = async (data) => {
    console.log('Submitting login form with data:', data);
    try {
      const res = await axios.post('https://mern-backendd-1.onrender.com/login', data);
      console.log('Response:', res.data);
      
      const { token, user } = res.data.result;
  
      dispatch(loginSuccess({ token, userData: user }));
  
      toast.success('User logged in Successfully', {
        onClose: () => navigate('/dashboard') 
      });
  
      reset();
      
    } catch (err) {
      console.error('Error:', err);
      toast.error(err.response.data.error || 'An error occurred');
      reset();
    }
  };
  

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h1 className='heading' style={{ fontSize: "25px", fontWeight: "700" }}>Login</h1>
        <input
          type="number"
          placeholder="Phone"
          {...register('phone', { required: 'Phone is required' })}
          className="input-field"
        />
        {errors.phone && <div className="error-message">{errors.phone.message}</div>}

        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: 'Password is required' })}
          className="input-field"
        />
        {errors.password && <div className="error-message">{errors.password.message}</div>}

        <button type="submit" className="submit-button">
          Login
        </button>
        <div className="create-account-link">
          <p>Don't have an account? <Link to="/" style={{ color: 'black', textDecoration: 'underline' }}>Create new account</Link></p>
        </div>
      </form>
      <ToastContainer position="top-center"/>
    </div>
  );
};

export default Login;
