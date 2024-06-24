import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { loginSuccess,logout } from '../../redux/actions/userActions'; 

const Dashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: userData ? userData.name : '',
    email: userData ? userData.email : '',
    phone: userData ? userData.phone : '',
    photo: userData ? userData.photo : '',
    photoPreview: userData ? `http://localhost:8000/uploads/${userData.photo}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBCD3GkdMpP-CZxPAvsipaAYXeKlWR6bQV_Q&s',
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        photo: userData.photo,
        photoPreview: userData.photo ? `http://localhost:8000/uploads/${userData.photo}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBCD3GkdMpP-CZxPAvsipaAYXeKlWR6bQV_Q&s',
      });
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('email', formData.email);
      formDataToSubmit.append('phone', formData.phone);
      formDataToSubmit.append('password', userData.password); 
      formDataToSubmit.append('confirm_password', userData.password); 

      if (formData.photoFile) {
        formDataToSubmit.append('photo', formData.photoFile);
      }

      const response = await axios.patch(`http://localhost:8000/update/${userData._id}`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      let token = localStorage.getItem('authToken');
      dispatch(loginSuccess({ token: token, userData: response.data }));
      toast.success('User updated Successfully');
    } catch (err) {
      console.error('Error updating user:', err);
      toast.error(err.message || 'An error occurred');
    }
  };

  const handleLogout = async () => {
    try {
      const data = await axios.get('http://localhost:8000/logout');
      console.log(data);
      localStorage.removeItem('authToken');
      dispatch(logout())
      toast.success('User logged out Successfully', {
        onClose: () => navigate('/login')
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoPreviewUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        photoFile: file,
        photoPreview: photoPreviewUrl,
      });
    }
  };

  return (
    <>
      <div className="dashboard-page">
        <form className="dashboard-form" onSubmit={handleSubmit}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '2xl', sm: '3xl' }}
            textAlign="center"
            as="h2"
          >
            User Dashboard
          </Heading>
          <Flex direction="column" align="center">
            <Avatar
              size="2xl"
              mb={'10px'}
              mt={'20px'}
              src={formData.photoPreview}
            />
            <label>
              <input
                id="photoInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <Button size="sm" mt={2} onClick={() => document.getElementById('photoInput').click()}>
                Change Icon
              </Button>
            </label>
          </Flex>
          <FormControl id="userName" isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="Username"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
              required
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
              type="email"
              required
            />
          </FormControl>
          <FormControl id="phone" isRequired>
            <FormLabel>Phone number</FormLabel>
            <Input
              placeholder="Phone number"
              value={formData.phone}
              disabled
              className="input-field"
              required
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}
              onClick={handleLogout}
              className="submit-button"
            >
              Logout
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
              type="submit"
              className="submit-button"
            >
              Update
            </Button>
          </Stack>
        </form>
        <ToastContainer position="top-center" />
      </div>
    </>
  );
};

export default Dashboard;
