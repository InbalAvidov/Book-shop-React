const { useState, useEffect } = React
const { Link } = ReactRouterDOM



import { BookService } from './../services/book.service.js'
import { BooksList } from '../cmps/books-list.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'
import { eventBusService } from '../services/event-bus.service.js'

export function Books() {
    const [filterBy, setFilterBy] = useState(BookService.getDefaultFilter())
    const [books, setBooks] = useState([])
    const [addBook, setAddBook] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        BookService.getBooks(filterBy)
        .then((books) =>{
            setBooks(books)   
        })
    }
   
    function onRemoveBook(id){
       BookService.remove(id)
       .then(()=>{
           loadBooks()
           eventBusService.emit('show-user-msg','Book Removed')
    })}

    function onSetFilter(filter){
        setFilterBy(filter)
    }
    
    return <div className="books-page">
        <h1>The Books Shop</h1>
        <Link to={`/book/Edit`}>Add Book</Link>
        <BookFilter onSetFilter ={onSetFilter}/>
        <BooksList books={books} onRemoveBook={onRemoveBook}/>
    </div>
}

