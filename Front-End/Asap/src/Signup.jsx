import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [input, setInput] = useState({
        name: '',
        user_id: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/user', {
                name: input.name,
                user_id: input.user_id,
                email: input.email,
                password: input.password
            });
            console.log(response.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' value={input.name} name='name' placeholder='Name' onChange={handleChange} />
                <input type='text' value={input.user_id} name='user_id' placeholder='Username' onChange={handleChange} />
                <input type='email' value={input.email} name='email' placeholder='E-mail' onChange={handleChange} />
                <input type='password' value={input.password} min={3} name='password' placeholder='Password' onChange={handleChange} />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
