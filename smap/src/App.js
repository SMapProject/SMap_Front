import { Routes, Route } from "react-router-dom";
import SafetyPage from "./pages/Safety/SafetyPage";
import TrafficPage from "./pages/Traffic/TrafficPage";
import CrimeGraph from "./pages/Stats/CrimeGraph";
import RegionalGraph from "./pages/Stats/RegionalGraph";
import DateGraph from "./pages/Stats/DateGraph";
import CrimeReport from "./pages/Report/CrimeReport";
import ErrorReport from "./pages/Report/ErrorReport";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SafetyPage />} />       
      <Route path="/safety" element={<SafetyPage />} />
      <Route path="/traffic" element={<TrafficPage />} />
      <Route path="/stats/crime" element={<CrimeGraph />} />
      <Route path="/stats/Regional" element={<RegionalGraph />} />
      <Route path="/stats/date" element={<DateGraph />} />
      <Route path="/report/crime" element={<CrimeReport />} />
      <Route path="/report/error" element={<ErrorReport />} />
    </Routes>
  );
}

export default App;
