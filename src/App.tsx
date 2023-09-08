import "./App.css";
import HomeRoute from "./components/HomeRoute";
import ShoutoutList from "./components/ShoutoutList";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import SingleShoutoutRoute from "./components/ShoutoutsByNameRoute";
import ShoutoutsByNameRoute from "./components/ShoutoutsByNameRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/user/:name" element={<ShoutoutsByNameRoute />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
