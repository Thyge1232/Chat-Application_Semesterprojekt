import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Demo } from "./pages/Demo";
import { Login } from "./pages/Login";
import { Layout } from "./ui/Layout";

const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Demo />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
