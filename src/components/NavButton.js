const NavButton = ({ className, text, onClick }) => {
  return (
    <li>
      <button className={className} onClick={onClick}>
        {text}
      </button>
    </li>
  )
}

export default NavButton;