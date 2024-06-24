import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Verify = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const onSubmit = async (data) => {
    console.log('Submitting OTP verification with data:', data);
    try {
      const res = await axios.post('http://localhost:8000/verify-otp', data);
      console.log('Response:', res.data);

      const { token, user } = res.data.result;

      dispatch(loginSuccess({ token, userData: user }));

      toast.success('OTP verified Successfully', {
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
        <h1 className='heading' style={{ fontSize: "25px", fontWeight: "700" }}>Verify OTP</h1>
        <input
          type="number"
          placeholder="Enter Phone Number"
          {...register('phone', { required: 'Phone is required' })}
          className="input-field"
        />
        {errors.phone && <div className="error-message">{errors.phone.message}</div>}

        <input
          type="text"
          placeholder="Enter OTP"
          {...register('otp', { required: 'OTP is required' })}
          className="input-field"
        />
        {errors.otp && <div className="error-message">{errors.otp.message}</div>}

        <button type="submit" className="submit-button">
          Verify OTP
        </button>
      </form>
      <ToastContainer position="top-center"/>
    </div>
  );
};

export default Verify;
