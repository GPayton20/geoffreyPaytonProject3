import { useState } from 'react';
import BookList from './BookList';
import CardFlipButton from './CardFlipButton';

const Card = ({ booksToRead, booksCompleted, markAsRead, deleteBook }) => {

  const [viewingCompleted, setViewingCompleted] = useState(false);

  const handleCardFlip = () => setViewingCompleted(!viewingCompleted);

  return (
    <div className={`list-card ${viewingCompleted ? 'flipped' : ``}`}>
      
      <BookList
        facing={!viewingCompleted}
        heading={`Books To Read`}
        list={booksToRead}
        completed={false}
        markAsRead={markAsRead}
        deleteBook={deleteBook}
      >
        <CardFlipButton onClick={handleCardFlip} completed={false}/>
      </BookList>
     
      <BookList
        facing={viewingCompleted}
        heading={`Books Completed`}
        list={booksCompleted}
        completed={true}
        markAsRead={markAsRead}
        deleteBook={deleteBook}
      >
        <CardFlipButton onClick={handleCardFlip} completed={true}/>
      </BookList>

    </div>
  )
}

export default Card