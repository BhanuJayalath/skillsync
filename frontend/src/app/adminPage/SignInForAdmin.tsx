import { useState } from "react";
import styles from "./adminPage.module.css"
import { useRouter } from "next/router";

export default function SignInForAdmin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = () => {
        const adminUserName = "adminSkillSync";
        const adminPassword = "passwordSkillSync";

        if (username === adminUserName && password === adminPassword){
            localStorage.setItem("isAuthenticated", "true");
            router.push("page");
        } else {
            setError("Invalid username or password");
        }
    }

  return (
    <div className={styles.signinContainer}>
      <h2>Admin Sign In</h2>
      
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
    </div>
  )
}
