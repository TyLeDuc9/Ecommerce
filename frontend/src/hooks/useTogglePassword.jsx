import { useState } from 'react';

const useTogglePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(prev => !prev);
  return { showPassword, togglePassword };
};

export default useTogglePassword;