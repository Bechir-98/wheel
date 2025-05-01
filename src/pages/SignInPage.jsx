import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const PageContainer = styled.div`
  min-height: calc(100vh - 76px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.neutral[100]};
  padding: ${theme.spacing[8]} ${theme.spacing[4]};
`;

const FormContainer = styled(motion.div)`
  max-width: 400px;
  width: 100%;
  padding: ${theme.spacing[8]};
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: ${theme.spacing[6]};
  color: ${theme.colors.neutral[900]};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.error[500]};
  font-size: ${theme.typography.fontSize.sm};
  margin-top: ${theme.spacing[2]};
  text-align: center;
`;

const SignInPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Replace with your actual API endpoint
      const apiUrl = 'http://localhost/wheelmatch/api/login_handler.php';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Save user data and token to localStorage or context
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect based on role
        switch (data.user.role) {
          case 'patient':
            navigate('/patient');
            break;
          case 'clinician':
            navigate('/clinician');
            break;
          case 'vendor':
            navigate('/vendor');
            break;
          default:
            navigate('/dashboard');
        }
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Connection error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <FormContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Welcome Back</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            icon={<FaUser />}
            required
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            icon={<FaLock />}
            required
            value={formData.password}
            onChange={handleChange}
          />
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Form>
      </FormContainer>
    </PageContainer>
  );
};

export default SignInPage;