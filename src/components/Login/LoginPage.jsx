import { useState } from "react";
import Home from "../Home/Home";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, SetIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username !== "") {
      SetIsLoggedIn(true);
    } else {
      alert("Isi username terlebih dahulu");
    }
  };

  if (isLoggedIn) {
    return <Home username={username} />;
  }

  return (
    <div className="container">
      <div className="d-flex flex-column justify-content-center align-items-center  mt-5">
        <h1>Login Page</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
