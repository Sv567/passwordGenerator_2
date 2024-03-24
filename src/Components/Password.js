import React, { useState, useRef, useCallback } from 'react';

const Password = () => {
  const [password, setPassword] = useState('');

  const lengthRef = useRef();
  const uppercaseRef = useRef();
  const numbersRef = useRef();
  const symbolsRef = useRef();
  const passwordRef = useRef(); 


  const generatePassword = useCallback(() => {
    const length = lengthRef.current.value;
    const includeUppercase = uppercaseRef.current.checked;
    const includeNumbers = numbersRef.current.checked;
    const includeSymbols = symbolsRef.current.checked;

    setPassword(generateRandomPassword(length, includeUppercase, includeNumbers, includeSymbols));
  }, []);

  const generateRandomPassword = (length, includeUppercase, includeNumbers, includeSymbols) => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let validChars = lowercaseChars;
    if (includeUppercase) validChars += uppercaseChars;
    if (includeNumbers) validChars += numberChars;
    if (includeSymbols) validChars += symbolChars;

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      password += validChars[randomIndex];
    }
    return password;
  };

  const handleCopyText = () => {
    passwordRef.current.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
  }

  return (
    <div className='container'>
      <h2>Password Generator</h2>
      <div className='password-length'>
        <label>Password Length:  </label>
     
        <input type="number" ref={lengthRef} defaultValue={8} min={4} max={20} />
      </div>
      <div className='checkbox'>
        <label>
          <input type="checkbox" ref={uppercaseRef} /> Include Uppercase
        </label>
      </div>
      <div className='checkbox'>
        <label>
          <input type="checkbox" ref={numbersRef} /> Include Numbers
        </label>
      </div>
      <div className='checkbox'>
        <label>
          <input type="checkbox" ref={symbolsRef} /> Include Symbols
        </label>
      </div>
      <button onClick={generatePassword} className='generate-btn'>Generate Password</button>
      <div className='generate-password'>
        <h3>Generated Password:</h3>
        <input type="text" value={password} readOnly ref={passwordRef} />
        <button onClick={handleCopyText}>copy</button>
      </div>
    </div>
  );
};

export default Password;
