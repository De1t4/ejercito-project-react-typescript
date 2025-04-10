import { useGlobalContext } from '@/context/globalContext';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const { isLoggedIn } = useGlobalContext();
  return isLoggedIn ? <Navigate to="/dashboard"/> : <Outlet />;
}

export default PublicRoute;
