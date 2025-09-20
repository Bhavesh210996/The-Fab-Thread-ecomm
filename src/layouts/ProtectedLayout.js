import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ui/ProtectedRoute";

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <main>
        <Outlet />
      </main>
    </ProtectedRoute>
  );
}

export default ProtectedLayout;
