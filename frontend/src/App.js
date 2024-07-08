import './App.css';
import CustomFooter from './components/Footer'; 
import CustomHeader from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import AddNewAuthor from './components/AddNewAuthor';
import AddNewBook from './components/AddNewBook';
import ListBooks, { ListBooksByGenre, ListBooksByTitle, ListBooksByAuthor } from './components/ListBooks';
import BookDetails from './components/BookDetails';

function App() {
  return (
    <>
    <div className="App">
      <CustomHeader />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ListBooks" element={<ListBooks />} />
          <Route path="/AddBook" element={<AddNewBook />} />
          <Route path="/AddAuthor" element={<AddNewAuthor />} />
          <Route path="/ListBooksByGenre/:genre_id" element={<ListBooksByGenre/>} />
          <Route path="/ListBooksByTitle/:start" element={<ListBooksByTitle/>} />
          <Route path="/ListBooksByAuthor/:author_id" element={<ListBooksByAuthor/>} />
          <Route path="/BookDetails/:book_id" element={<BookDetails/>} />
        </Routes>
      </main>
      </div>
      <CustomFooter />       
    </>
  );
}

export default App;



