import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import DashboardLayout from "./pages/Dashboard";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <DashboardLayout /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={
                !user ? <Login initialValue={true} /> : <Navigate to="/" />
              }
            />
            <Route
              path="/signup"
              element={
                !user ? <Login initialValue={false} /> : <Navigate to="/" />
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
