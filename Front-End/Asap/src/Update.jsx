import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';
import './Update.css'

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
      const response = await axios.put(`https://storoberry.onrender.com/d-update/${id}`, formData); 
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

// console.log(incidentID)
  return (
    <div id='form-div'>
      <h2>Update Form</h2>
      <form id='update-form' onSubmit={handleSubmit}>
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
  <textarea
    name="description"
    value={formData.description}
    onChange={handleChange}
    // style={{
    //   minWidth: "400px", // Minimum width
    //   maxWidth: "50%", // Maximum width
    //   // maxHeight:"600px",
    //   maxHeight:"800px",
    //   width: "100%", // Initial width
    //   resize: "horizontal", // Allow horizontal resizing
    //   boxSizing: "border-box", // Include padding and border in the width
    //   padding: "10px", // Add padding for better appearance
    //   border: "1px solid #ccc", // Add border for visual separation
    //   borderRadius: "4px", // Add border radius for rounded corners
    //   marginBottom: "10px" // Add margin for spacing
    // }}
  />
</label>
<label>
  Security Measures:
  <textarea
    name="securityMeasures"
    value={formData.securityMeasures}
    onChange={handleChange}
    // style={{
    //   minWidth: "670px", // Minimum width
    //   maxWidth: "100%", // Maximum width
    //   width: "100%", // Initial width
    //   resize: "horizontal", // Allow horizontal resizing
    //   resize:"vertical",
    //   boxSizing: "border-box", // Include padding and border in the width
    //   padding: "10px", // Add padding for better appearance
    //   border: "1px solid #ccc", // Add border for visual separation
    //   borderRadius: "4px" // Add border radius for rounded corners
    // }}
  />
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
          Number of Suspects:
          <input type="number" name="suspectInformation.numberOfSuspects" value={formData.suspectInformation.numberOfSuspects} onChange={handleChange} />
        </label>
        <label> 
          Weapons Used:
          <input type="text" name="suspectInformation.weaponsUsed" value={formData.suspectInformation.weaponsUsed} onChange={handleChange} />
        </label>
        <label>
      youtubeLink
          <input type="text" name="youtubeLink"  value={formData.youtubeLink} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Update;
