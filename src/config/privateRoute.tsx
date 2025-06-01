import { useGlobalContext } from '@/context/globalContext';
import { Role } from '@/models/authModels';
import { OFICIAL, SOLDIER, SUB_OFICIAL } from '@/shared/constants/Roles';
import LayoutContent from '@/shared/layouts/LayoutContent';
import LayoutOficial from '@/shared/layouts/LayoutOficial';
import LayoutSubOficial from '@/shared/layouts/LayoutSubOficial';
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
        return <Navigate to="/dashboard" />;
      case OFICIAL:
        return <Navigate to="/dashboard" />;
      default:
        return <Navigate to="/" />;
    }
  }

  switch (userRole) {
    case OFICIAL:
      return <LayoutOficial />
    case SUB_OFICIAL:
      return <LayoutSubOficial />
    case SOLDIER:
      return <LayoutContent ><Outlet /></LayoutContent>
  }
}