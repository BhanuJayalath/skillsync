import { useState } from "react";
import styles from "./adminPage.module.css"

export default function SignInForAdmin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
