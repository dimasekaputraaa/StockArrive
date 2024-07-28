import { Dashboard } from "./pages/dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SetupData from "./components/setupData";
import GoodReceive from "./components/goodReceive";
import { ComboboxDemo } from "./components/autoComplete";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="setup" element={<SetupData />} />
          <Route path="goodReceive" element={<GoodReceive />} />
          <Route path="Monitoring" element={<ComboboxDemo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
