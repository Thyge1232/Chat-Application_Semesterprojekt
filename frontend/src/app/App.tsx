import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "../features/authentication/pages/Login";
import { Signup } from "../features/authentication/pages/Signup";
import { Conversations } from "../features/conversations/pages/Conversations";
import { Home } from "../features/users/pages/Home";
import { Layout } from "../sharedComponents/Layout/Layout";
import { RequireAuth } from "../features/authentication/RequireAuth";
import { Users } from "../features/users/pages/Users";

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
              <Conversations />
            </RequireAuth>
          }
        />
        <Route
          path="/users"
          element={
            <RequireAuth>
              <Users />
            </RequireAuth>
          }
        />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="*"
          element={<div>404 siden findes ikke... sorry not sorry</div>}
        />
      </Routes>
    </Layout>
  </Router>
);

export default App;
