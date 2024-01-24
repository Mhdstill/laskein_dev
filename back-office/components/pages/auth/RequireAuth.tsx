import { useEffect } from 'react';
import { useAppSelector } from '../../../services/redux/hooks';

const RequireAuth = ({ children }: any) => {
  const { isLogedIn } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!isLogedIn) window.location.href = '/auth/login';
  }, [isLogedIn]);
  if (isLogedIn) return children;
  return null;
};

export default RequireAuth;
