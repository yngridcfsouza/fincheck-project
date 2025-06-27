import { Outlet, Navigate } from 'react-router-dom';

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const signedIn = false;

  if (!signedIn && isPrivate) {
    //redirecionar para /login
    return <Navigate to="/login" replace />;
  }

  if (signedIn && !isPrivate) {
    //redirecionar para / (dashboard)
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
