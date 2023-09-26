import React, { useState } from 'react';

function PassGen() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [strength, setStrength] = useState('');

  const generatePassword = () => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let generatedPassword = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword = generatedPassword + charset.charAt(randomIndex);
    }

    const calculatedStrength = calculatePasswordStrength(generatedPassword);
    
    setPassword(generatedPassword);
    setStrength(calculatedStrength);

    console.log(generatedPassword);
    console.log(calculatedStrength);


  };

  const calculatePasswordStrength = (password) => {
    const length = password.length;
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[\W_]/.test(password);

    if (length < 8) {
      return 'Very Weak';
    } else if (length < 10 && (hasLowerCase || hasUpperCase || hasDigit || hasSpecialChar)) {
      return 'Weak';
    } else if (length < 12 && (hasLowerCase || hasUpperCase || hasDigit) && hasSpecialChar) {
        return 'Medium';
    } else if (length >= 12 && (hasLowerCase || hasUpperCase) && hasDigit && hasSpecialChar) {
      return 'Very Strong';
    } else {
      return 'Strong';
    }
  };

  const handleLengthChange = (event) => {
    setLength(event.target.value);
  };

  return (
    <div>
      <h1>Password Generator</h1>
      <div>
        <label>Password Length:</label>
        <input
          type="number"
          value={length}
          onChange={handleLengthChange}
          min="8"
          max="16"
        />
      </div>
      <button onClick={generatePassword}>Generate Password</button>
      <div>
        <strong>Generated Password:</strong>
        <p>{password}</p>
      </div>
      <div>
        <strong>Password Strength:</strong>
        <p>{strength}</p>
      </div>
    </div>
  );
}

export default PassGen;
