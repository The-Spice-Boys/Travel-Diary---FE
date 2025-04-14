import { UserProvider } from "./context/User";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { CountryPage } from "./components/CountryPage";
import { UserPage } from "./components/UserPage";
import { UserSettingsPage } from "./components/UserSettingsPage";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:country" element={<CountryPage />} />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/settings" element={<UserSettingsPage />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
