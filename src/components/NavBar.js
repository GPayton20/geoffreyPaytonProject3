const NavBar = ({ className, children }) => {
  return (
    <nav className={className}>
      <ul>
        {children}
      </ul>
    </nav>
  )
}

export default NavBar;