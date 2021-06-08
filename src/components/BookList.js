import ListItem from './ListItem';

const BookList = ({ facing, heading, list, completed, markAsRead, deleteBook, children }) => {
  return (
    // Add class to rotate card in 3D, display desired list
    <div className={`list-card-side ${completed ? 'flipped' : ''} ${facing ? 'facing' : ''}`}>
      <h2>{heading}</h2>

      {list.length === 0 ? <p>You have not added any books.</p> : null}
      
      <ul>
        {list.map(book => {
          return (
            <ListItem 
              title={book.title} 
              author={book.author} 
              key={book.key}
              id={book.key}
              completed={completed} 
              markAsRead={markAsRead}
              deleteBook={deleteBook}
            />
          )
        })}
      </ul>

      {children}

    </div>
  )
}

export default BookList;