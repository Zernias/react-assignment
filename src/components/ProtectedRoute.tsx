import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ loggedIn, children }: IProtectedRoute) => {
  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default ProtectedRoute;
