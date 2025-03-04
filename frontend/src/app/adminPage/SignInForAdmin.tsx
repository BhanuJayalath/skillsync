import styles from "./adminPage.module.css"

export default function SignInForAdmin() {
  return (
    <div className={styles.signinContainer}>
      <h2>Admin Sign In</h2>
      
      <input 
        type="text" 
        placeholder="Username"
      />
      <input 
        type="password" 
        placeholder="Password" 
      />
    </div>
  )
}
