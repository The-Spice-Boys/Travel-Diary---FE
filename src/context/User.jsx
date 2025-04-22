import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser, isLoggedIn, setIsLoggedIn}}>
      {children}
    </UserContext.Provider>
  );
};

export const ThemeContext = createContext();
export const ThemeProvider = ({children}) =>{
  const [theme, setTheme] = useState("#fff")
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}