import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import './Contact.css'; // Assuming you have a CSS file for styling

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState(''); // State to hold the notification
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted!'); // Confirm form submission
  
    try {
      const response = await axios.post('http://localhost:8000/api/contact/', formData);
      console.log('API response:', response); // Confirm API request
      window.location.href = '/'; // Redirect immediately
      if (response.status === 200) {
        setStatus('Your message has been sent successfully!');
        console.log('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      }
    } catch (error) {
      console.error('Error sending message:', error); // Handle error
      setStatus('There was an error sending your message. Please try again.');
    }
  };
  
  
  
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        <button type="submit">Send Message</button>
        {/* Display the status message */}
        {status && <p className="status-message">{status}</p>}
      </form>
    </div>
  );
};

export default Contact;
