export const Square = ({ index, isSelected, udpateBoard, children }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    if (udpateBoard) {
      udpateBoard(index)
    }
  } 

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}; 