import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Demo } from "./pages/Demo";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { Conversations } from "./pages/Conversations";
import { Layout } from "./ui/Layout";
import { Users } from "./pages/Users";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Registration />} />

      <Route
        path="/conversations"
        element={
          <Layout>
            <Conversations />
          </Layout>
        }
      />

      <Route
        path="/users"
        element={
          <Layout>
            <Users />
          </Layout>
        }
      />
    </Routes>
  </Router>
);

export default App;
