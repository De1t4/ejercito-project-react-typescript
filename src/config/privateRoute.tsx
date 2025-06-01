import { useGlobalContext } from '@/context/globalContext';
import { Role } from '@/models/authModels';
import { OFICIAL, SOLDIER, SUB_OFICIAL } from '@/shared/constants/Roles';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  allowedRoles: Role[];
}

export const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const { isLoggedIn, getUserRole } = useGlobalContext();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  const userRole = getUserRole()?.toUpperCase();

  const hasAccess = allowedRoles.some((role) => role.toUpperCase() === getUserRole());
  if (!hasAccess) {
    switch (userRole) {
      case SOLDIER:
        return <Navigate to="/profile" />;
      case SUB_OFICIAL:
        return <Navigate to="/home" />;
      case OFICIAL:
        return <Navigate to="/home" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return <Outlet />
}