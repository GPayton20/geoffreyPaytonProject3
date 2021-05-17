import { useState, useEffect, Fragment } from 'react';
import './styles/App.css';
import firebase from './config/firebase.js'
import Header from './Header';
import NavBar from './NavBar';
import NavButton from './NavButton';
import AddBookForm from './AddBookForm';
import Card from './Card'
import ReadingGoal from './ReadingGoal';
import SetGoalForm from './SetGoalForm';
import Footer from './Footer';

export const dbRefToRead = firebase.database().ref('/toRead');
export const dbRefCompleted = firebase.database().ref('/completed');
export const dbRefUsers = firebase.database().ref('/users');

function App() {

  const [booksToRead, setBooksToRead] = useState([]);
  const [booksCompleted, setBooksCompleted] = useState([]);
  const [addingBooks, setAddingBooks] = useState(false);
  const [settingGoal, setSettingGoal] = useState(false);
  const [userGoal, setUserGoal] = useState(undefined);
  

  const updateList = response => {
    const newList = [];
    
    response.forEach(child => {
      const newBook = child.val();
      newList.push( 
        {
          // Retrieve random key from Firebase
          key: child._delegate.key,
          title: newBook.title, 
          author: newBook.author
        } 
      );
    });
   
    return newList;
  }
  
  useEffect( () => {

    dbRefToRead.on('value', response => setBooksToRead(updateList(response)));
    dbRefCompleted.on('value', response => setBooksCompleted(updateList(response)));

  }, []);

  
  return (
    <Fragment>
      
      <Header>
        <NavBar>
          <NavButton text="Add books" onClick={() => setAddingBooks(!addingBooks)} />
          <NavButton text="Set goal" onClick={() => setSettingGoal(!settingGoal)} />
        </NavBar>
      </Header>

      <div className="wrapper">
        <main>

          {addingBooks
            ? <AddBookForm 
                listToPush={dbRefToRead}
                currentState={addingBooks}
                changeState={setAddingBooks} />
            : settingGoal
              ? <SetGoalForm />
              : <Fragment>
                
                <ReadingGoal booksCompleted={booksCompleted} />
                <Card booksToRead={booksToRead} booksCompleted={booksCompleted} />
              
              </Fragment>
          }

        </main>
      </div>

      <Footer />

    </Fragment>
  );
}

export default App;

