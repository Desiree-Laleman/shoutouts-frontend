import "./App.css";
import HomeRoute from "./components/HomeRoute";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import ShoutoutsByNameRoute from "./components/ShoutoutsByNameRoute";
import Header from "./components/Header";
import MeRoute from "./components/MeRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/shoutouts" element={<ShoutoutsByNameRoute />} />
          <Route path="/me" element={<MeRoute />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
