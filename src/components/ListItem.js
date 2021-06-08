const ListItem = ({ title, author, id, completed, markAsRead, deleteBook }) => {

  return (
    <li key={id}>
      <p className="title">{title}</p>
      <p className="author">by {author}</p>
      <div className="container">
        <button onClick={ () => deleteBook(id, completed)}>Delete</button>
        {!completed && <button onClick={() => markAsRead(title, author, id)}
      >Read</button>}
      </div>
    </li>
  )
}

export default ListItem;