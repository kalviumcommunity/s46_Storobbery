import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';

const Update = () => {
  const { id } = useParams(); // Get id from URL params
  const [formData, setFormData] = useState({
    dateTime: '',
    location: {
      city: '',
      state: '',
      address: '',
    },
    suspectInformation: {
      numberOfSuspects: '',
      descriptions: [],
      weaponsUsed: '',
    },
    amountStolen: '',
    description: '',
    robberyType: '',
    securityMeasures: '',
    youtubeLink:"",
    username: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split('.');
    
    if (child) {
      setFormData(prevState => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/d-update/${id}`, formData); 
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

// console.log(incidentID)
  return (
    <div>
      <h2>Update Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
          Date Time:
          <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} />
        </label>
        <label>
          City:
          <input type="text" name="location.city" value={formData.location.city} onChange={handleChange} />
        </label>
        <label>
          State:
          <input type="text" name="location.state" value={formData.location.state} onChange={handleChange} />
        </label>
        <label>
          Address:
          <input type="text" name="location.address" value={formData.location.address} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <label>
          Robbery Type:
          <input type="text" name="robberyType" value={formData.robberyType} onChange={handleChange} />
        </label>
        <label>
          Amount Stolen:
          <input type="number" name="amountStolen" value={formData.amountStolen} onChange={handleChange} />
        </label>
        <label>
          Security Measures:
          <textarea name="securityMeasures" value={formData.securityMeasures} onChange={handleChange} />
        </label>
        <label>
          Number of Suspects:
          <input type="number" name="suspectInformation.numberOfSuspects" value={formData.suspectInformation.numberOfSuspects} onChange={handleChange} />
        </label>
        <label> 
          Weapons Used:
          <input type="text" name="suspectInformation.weaponsUsed" value={formData.suspectInformation.weaponsUsed} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Update;
