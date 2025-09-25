import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Demo } from "./pages/Demo";
import { Login } from "./pages/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Demo />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
