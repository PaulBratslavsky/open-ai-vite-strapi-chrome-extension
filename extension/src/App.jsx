import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";

function isEmptyObject(obj) {
  return JSON.stringify(obj) === "{}";
}

function checkLocalStorageAndSetState(setCredentials) {
  chrome.storage.sync.get("credentials", (data) => {
    if (!isEmptyObject(data)) {
      setCredentials(JSON.parse(data.credentials));
    } else {
      setCredentials(null);
    }
  });
}

export default function App() {
  const [credentials, setCredentials] = useState(null);

  useEffect(() => {
    checkLocalStorageAndSetState(setCredentials);
  }, []);

  function handleLogin(credentials) {
    chrome.storage.sync.set({ credentials: JSON.stringify(credentials) });
    setCredentials(credentials);
  }

  const handleLogout = () => {
    setCredentials(null);
    chrome.storage.sync.remove("credentials");
  };

  return (
    <div className="App">
      <Header />
      {credentials ? (
        <Dashboard credentials={credentials}>
          <Logout onClick={handleLogout} />
        </Dashboard>
      ) : (
        <LoginForm setCredentials={handleLogin} />
      )}
    </div>
  );
}
