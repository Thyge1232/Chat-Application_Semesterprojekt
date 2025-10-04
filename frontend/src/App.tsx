import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Conversations } from "./pages/Conversations";
import { Settings } from "./pages/Settings";
import { Users } from "./pages/Users";
import { Home } from "./pages/Home";
import { Layout } from "./ui/Layout";

const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/conversations" element={<Conversations />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
