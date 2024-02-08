import React, { useState } from 'react'
import axios from 'axios';


function Form() {

  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });


  const [errors, setErrors] = useState({});
  const [sendRegister, setSendRegister] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSendRegister(true);

    const validationError = {};

    if (info.firstName.length < 3) {
      validationError.firstName = 'İsim en az 3 karakter olmalı';
    }

    if (info.lastName.length < 3) {
      validationError.lastName = 'Soyisim en az 3 karakter olmalı';
    }

    if (!info.email.includes('@')) {
      validationError.email = 'Geçerli bir email adresi girin';
    }

    if (info.password.length < 8) {
      validationError.password = 'Şifre en az 8 karakter olmalı';
    }

    if (validationError.firstName || validationError.lastName || validationError.email || validationError.password) {
      setErrors(validationError);
      setSendRegister(false);
    } else {
      axios.post('https://reqres.in/api/users', info)
        .then(response => {
          setInfo({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
          });
        })
        .catch(error => {
          console.error(error);
        })
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div htmlFor="firstName">Ad</div>
        <input
          type="text"
          name="firstName"
          data-testid="firstName-error-message"
          value={info.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <div>{errors.firstName}</div>}
      </div>
      <div>
        <div htmlFor="lastName">Soyad</div>
        <input
          type="text"
          name="lastName"
          value={info.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <div>{errors.lastName}</div>}
      </div>
      <div>
        <div htmlFor="email">Email</div>
        <input
          type="email"
          name="email"
          value={info.email}
          onChange={handleChange}
        />
        {errors.email && <div>{errors.email}</div>}
      </div>
      <div>
        <div htmlFor="password">Şifre</div>
        <input
          type="password"
          name="password"
          value={info.password}
          onChange={handleChange}
        />
        {errors.password && <div>{errors.password}</div>}
      </div>
      <button type="submit" data-testid="submit-button" disabled={sendRegister}>Register</button>
    </form>
  );
};

export default Form;