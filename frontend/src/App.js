import './App.css';
import CustomFooter from './components/Footer'; 
import CustomHeader from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import AddNewAuthor from './components/AddNewAuthor';
import AddNewBook from './components/AddNewBook';
import ListBooks from './components/ListBooks';
import BookDetails from './components/BookDetails';
import AddNewGenre from './components/AddNewGenre';
import ListGenres from './components/ListGenres';
import ListAuthors from './components/ListAuthors';

function App() {
  return (
    <>
    <div className="App">
      <CustomHeader />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ListBooks" element={<ListBooks />} />
          <Route path="/ListGenres" element={<ListGenres />} />
          <Route path="/ListAuthors" element={<ListAuthors />} />
          <Route path="/AddBook" element={<AddNewBook />} />
          <Route path="/AddAuthor" element={<AddNewAuthor />} />
          <Route path="/AddGenre" element={<AddNewGenre/>} />
          <Route path="/BookDetails/:book_id" element={<BookDetails/>} />
        </Routes>
      </main>
      </div>
      <CustomFooter />       
    </>
  );
}

export default App;



