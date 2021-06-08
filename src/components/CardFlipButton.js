const CardFlipButton = ({ onClick, completed }) => {
  return (
    <button onClick={onClick}>
      {completed ? 'View Reading List' : 'View Completed'}
    </button> 
  )
}

export default CardFlipButton;