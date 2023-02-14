import React, { useState } from 'react';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      console.log('Submit with value:', inputValue);
      setInputValue('');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button type="submit" disabled={inputValue.trim() === ''}>
        Submit
      </button>
    </form>
  );
};

export default App;




