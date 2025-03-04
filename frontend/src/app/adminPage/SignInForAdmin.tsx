import { useEffect, useState } from "react";
import styles from "./adminPage.module.css"
import { useRouter } from "next/router";

export default function SignInForAdmin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    // Redirect to Admin Page if already logged in
    useEffect(() => {
        if (localStorage.getItem("isAuthenticated") === "true") {
            router.push("/page");
        }
    }, []);

    

    const handleLogin = () => {
        const adminUserName = "adminSkillSync";
        const adminPassword = "passwordSkillSync";

        if (username === adminUserName && password === adminPassword){
            localStorage.setItem("isAuthenticated", "true");
            router.push("/page");
        } else {
            setError("Invalid username or password");
        }
    }

  return (
    <div className={styles.signinContainer}>
      <h2>Admin Sign In</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      
      <input 
        type="text" 
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
