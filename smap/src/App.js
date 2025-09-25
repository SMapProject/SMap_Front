import { Routes, Route } from "react-router-dom";
import SafetyPage from "./pages/Safety/SafetyPage";
import TrafficPage from "./pages/Traffic/TrafficPage";
import CrimeGraph from "./pages/Stats/CrimeGraph";
import DateGraph from "./pages/Stats/DateGraph";
import CrimeReport from "./pages/Report/CrimeReport";
import ErrorReport from "./pages/Report/ErrorReport";
import Seoul from "./pages/Stats/Regional/Seoul";
import Busan from "./pages/Stats/Regional/Busan";
import Daegu from "./pages/Stats/Regional/Daegu";
import Daejeon from "./pages/Stats/Regional/Daejeon";
import Gwangju from "./pages/Stats/Regional/Gwangju";
import Incheon from "./pages/Stats/Regional/Incheon";
import Sejong from "./pages/Stats/Regional/Sejong";
import Ulsan from "./pages/Stats/Regional/Ulsan";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SafetyPage />} />       
      <Route path="/safety" element={<SafetyPage />} />
      <Route path="/traffic" element={<TrafficPage />} />
      <Route path="/stats/crime" element={<CrimeGraph />} />
      <Route path="/stats/date" element={<DateGraph />} />
      <Route path="/report/crime" element={<CrimeReport />} />
      <Route path="/report/error" element={<ErrorReport />} />

      <Route path="/stats/Regional/Seoul" element={<Seoul />} />
      <Route path="/Stats/Regional/Busan" element={<Busan />} />
      <Route path="/stats/Regional/Daegu" element={<Daegu />} />
      <Route path="/stats/Regional/Daejeon" element={<Daejeon />} />
      <Route path="/stats/Regional/Gwangju" element={<Gwangju />} />
      <Route path="/stats/Regional/Incheon" element={<Incheon />} />
      <Route path="/stats/Regional/Sejong" element={<Sejong />} />
      <Route path="/stats/Regional/Ulsan" element={<Ulsan />} />
    </Routes>
  );
}

export default App;
