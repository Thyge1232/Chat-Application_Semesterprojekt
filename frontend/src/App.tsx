import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Conversations } from "./pages/Conversations";
import { Settings } from "./pages/Settings";
import { Users } from "./pages/Users";
import { Home } from "./pages/Home";
import { Layout } from "./ui/Layout";
import { RequireAuth } from "./components/RequireAuth";

const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/conversations"
          element={
            <RequireAuth>
              <Conversations />{" "}
            </RequireAuth>
          }
        />
        <Route
          path="/users"
          element={
            <RequireAuth>
              <Users />{" "}
            </RequireAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireAuth>
              <Settings />{" "}
            </RequireAuth>
          }
        />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />{" "}
            </RequireAuth>
          }
        />
      </Routes>
    </Layout>
  </Router>
);

export default App;
