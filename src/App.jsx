import { UserProvider, ThemeProvider } from "./context/User";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { CountryPage } from "./components/CountryPage";
import { UserPage } from "./components/UserPage";
import { UserSettingsPage } from "./components/UserSettingsPage";
import { NavBar } from "./components/NavBar";
import { LoginPage } from "./components/LoginPage";
import "./App.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
  return (
    <ThemeProvider>
    <UserProvider>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/countries/:country" element={<CountryPage />} />
        <Route path="/users/:username" element={<UserPage />} />
        <Route
          path="/users/:username/settings"
          element={<UserSettingsPage />}
        />
        <Route path="*" element={<Error error={404} />} />
      </Routes>
    </UserProvider>
    </ThemeProvider>
  );
}

export default App;
