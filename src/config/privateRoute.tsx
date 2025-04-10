import { useGlobalContext } from '@/context/globalContext';
import { Role } from '@/models/authModels';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  allowedRoles: Role[];
}

export const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const { isLoggedIn, getUserRole } = useGlobalContext();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  const hasAccess = allowedRoles.some((role) => role.toUpperCase() === getUserRole());
  if (!hasAccess) {
    switch (getUserRole()) {
      case "SOLDADO":
        return <Navigate to="/profile" />;
      case "SUB_OFICIAL":
        return <Navigate to="/dasboard" />;
      case "OFICIAL":
        return <Navigate to="/dasboard" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return <Outlet />;
}