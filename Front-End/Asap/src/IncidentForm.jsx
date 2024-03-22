import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; 

const IncidentForm = () => {
  const user=Cookies.get('id')
  const [formData, setFormData] = useState({
    dateTime: '',
    location: {
      city: '',
      state: '',
      address: '',
    },
    suspectInformation: {
      numberOfSuspects: '',
      weaponsUsed: '',
    },
    amountStolen: '',
    description: '',
    robberyType: '',
    securityMeasures: '',
     youtubeLink:'',
    username:user ,
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

  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://storoberry.onrender.com/upload",formData,{headers:{Authorization:Cookies.get('token')}})
    .catch (err=>{
      console.log(err.message)
    })
    console.log(formData);
  };
// console.log(incidentID)
  return (
    <div>
      <h2>Incident Form</h2>
      <form onSubmit={handleSubmit}>
        <p>{user}</p>
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
        <label>
      youtubeLink
          <input type="text" name="youtubeLink"  value={formData.youtubeLink} onChange={handleChange} />
        </label>
        <button type="submit">HI</button>
      </form>
    </div>
  );
};

export default IncidentForm;
