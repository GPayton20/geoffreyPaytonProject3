import { useState } from 'react';
import FormInput from './FormInput';

const AddBookForm = ({ addBook, onSubmit }) => {

  const [titleInput, setTitleInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');
  const [popupIsVisible, setPopupIsVisible] = useState(false);

  const handleInputChange = (event) => {
    if (event.target.id === 'title') {
      setTitleInput(event.target.value);
    } else {
      setAuthorInput(event.target.value);
    }
  }

  const handleAddBook = (event) => {
    event.preventDefault();

    if (!titleInput || !authorInput) {
      alert('Please enter a title and author')
    } else {
      // Add book to list
      addBook(titleInput, authorInput);
      // Clear input elements
      setTitleInput('');
      setAuthorInput('');
      // Display "Book added!" popup for 1 second, then remove
      setPopupIsVisible(true);
      setTimeout(() => {
        setPopupIsVisible(false);
      }, 1000);
    }
  }

  return (
    <>
    <p className={`popup-message ${popupIsVisible ? "" : "invisible"}`}>Book added!</p>
      <form action="submit" onSubmit={onSubmit} className="add-book-form">
        
        <FormInput 
          inputID="title"
          value={titleInput}
          onChange={handleInputChange}
        />
        
        <FormInput 
          inputID="author"
          value={authorInput}
          onChange={handleInputChange}
        />
        <div className="buttonContainer">
          <button onClick={handleAddBook}>Add book</button>
          <button type="submit">Done</button>
        </div>
      </form>
    </>
  )
}

export default AddBookForm;