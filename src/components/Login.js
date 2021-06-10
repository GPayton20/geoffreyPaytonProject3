const Login = ( {handleClick} ) => {
  return (
    <div className="login-container">
      <h2>Welcome!</h2>
      <button onClick={handleClick}>Login as guest</button>
    </div>
  )
}

export default Login;