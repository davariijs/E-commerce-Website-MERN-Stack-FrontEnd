import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthRedirect = () => {
      const needsRedirect = localStorage.getItem('authRedirect');

      if (needsRedirect === 'true') {
        localStorage.removeItem('authRedirect');
        navigate('/login');
      }
    };

    checkAuthRedirect();

    const interval = setInterval(checkAuthRedirect, 2000);

    return () => clearInterval(interval);
  }, [navigate]);

  return null;
};

export default AuthRedirect;
