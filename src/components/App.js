import { useState, useEffect, Fragment } from 'react';
import '../styles/App.css';
import firebase from '../config/firebase';
import Login from './Login';
import Header from './Header';
import NavBar from './NavBar';
import NavButton from './NavButton';
import AddBookForm from './AddBookForm';
import Card from './Card'
import ReadingGoal from './ReadingGoal';
import SetGoalForm from './SetGoalForm';
import Footer from './Footer';

function App() {
  const [user, setUser] = useState(null);

  const dbRefToRead = firebase.database().ref('/toRead');
  const dbRefCompleted = firebase.database().ref('/completed');
  const dbRefGoal = firebase.database().ref('/goal');

  const [booksToRead, setBooksToRead] = useState([]);
  const [booksCompleted, setBooksCompleted] = useState([]);
  
  const [pageView, setPageView] = useState('viewingLists');
  const [navDisabled, setNavDisabled] = useState(false);
  const [userGoal, setUserGoal] = useState(1);
  
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

  // Update user state when user logs in
  useEffect( () => {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      setUser(firebaseUser.uid);
    })
  }, [])
  
  // Update reading list items and user goal value whenever the database is updated
  useEffect( () => {
    dbRefToRead.on('value', response => setBooksToRead(updateList(response)));
    dbRefCompleted.on('value', response => setBooksCompleted(updateList(response)));
    dbRefGoal.on('value', response => setUserGoal(response.val()));
  }, []);
  
  // Disable navigation menu when adding books or setting goal
  useEffect( () => {
    if (pageView === 'viewingLists') {
      setNavDisabled(false);
    } else {
      setNavDisabled(true);
    }
  }, [pageView] )

  // Login user anonymously
  const anonLogin = () => {
    firebase.auth().signInAnonymously();
  }

  // Add book to to-read List
  const addBookToRead = (title, author) => {
    dbRefToRead.push({title, author});
  }

  // Move book from to-read list to completed list
  const markAsRead = (title, author, id) => {
    dbRefCompleted.push({title, author});

    dbRefToRead.child(id).remove();
  }

  // Delete book from either list
  const deleteBook = (id, completed) => {
    if (completed) {
      dbRefCompleted.child(id).remove();
    } else {
      dbRefToRead.child(id).remove();
    }
  }

  // Update user's current reading goal
  const setNewGoal = newGoal => {
    setUserGoal(newGoal);
    dbRefGoal.set(newGoal);

    setPageView('viewingLists');
  }

  return (
    <Fragment>

      <Header>
        {/* Hide navigation bar until user has logged in */}
        {!user ? 
        null :
          <NavBar>
            <NavButton 
              className={`${navDisabled ? "disabled" : null} ${pageView === 'addingBooks' ? "active" : null}`}
              text="Add books"
              onClick={ () => setPageView('addingBooks')} />
            <NavButton 
              className={`${navDisabled ? "disabled" : null} ${pageView === 'settingGoal' ? "active" : null}`}
              text={`Set goal (${userGoal})`} 
              onClick={ () => setPageView('settingGoal')} />
          </NavBar>
        }
      </Header>

      <div className="wrapper">
        {/* While user is logged out, display login modal */}
        {!user &&
          <main>
            <Login handleClick={anonLogin}/>
          </main>
        }

        {/* Once user is logged in, display full app */}
        {user &&
          <main>
  
            {pageView === 'addingBooks' &&
              <AddBookForm
                addBook={addBookToRead}
                onSubmit={() => setPageView('viewingLists')} />
            }

            {pageView === 'settingGoal' &&
              <SetGoalForm
                currentGoal={userGoal}
                onSubmit={setNewGoal}
              />
            }

            {pageView === 'viewingLists' &&
              <Fragment>

                <ReadingGoal booksCompleted={booksCompleted} goal={userGoal} />
                <Card
                  booksToRead={booksToRead}
                  booksCompleted={booksCompleted}
                  markAsRead={markAsRead}
                  deleteBook={deleteBook}
                />

              </Fragment>
            }

          </main>
        }
      </div>

      <Footer />

    </Fragment>
  );
}

export default App;

