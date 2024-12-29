// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedAnalysis = ({ children }) => {
//   const { userId } = useParams();
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
//   if (!isAuthenticated || user.id !== userId) {
  if (!isAuthenticated) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default Protected;