
const { useNavigate,Link,useParams} = ReactRouterDOM
const { useState, useEffect } = React

import { BookService } from "../services/book.service.js"
import { eventBusService } from "../services/event-bus.service.js"



export function EditBook(){

const [bookToEdit , setBookToEdit] = useState(BookService.getEmptyBook())
const navigate = useNavigate()
const {bookId} = useParams()

useEffect(() => {
    if (!bookId) return
    loadBook()
}, [])

function loadBook() {
    BookService.get(bookId)
        .then((book) => setBookToEdit(book))
        .catch((err) => {
            console.log('Had issues in book details', err)
            navigate('/book')
        })
}

function handleChange({target}){
    let { value, name: field } = target
    if(field === 'price'){
        bookToEdit.listPrice.amount = value
        setBookToEdit((prevBook)=>({...prevBook}))
    }
    setBookToEdit((prevBook)=>({...prevBook,[field]:value}))
}

function onSaveBook(ev){
    ev.preventDefault()
    BookService.save(bookToEdit).then(()=>{
        eventBusService.emit('show-user-msg','Added New Book')
        navigate('/book') 
      })
}


return <form onSubmit={onSaveBook} className="book-edit">
    <h1>Add a new book</h1>
    <label htmlFor="book-title">Book Title</label>
    <input type="text" id="book-title" placeholder="book title..." name="title" onChange={handleChange} value={bookToEdit.title}/>
    <br></br>
    <label htmlFor="book-author">Book Author</label>
    <input type="text" id="book-author" placeholder="book author..." name="authors" onChange={handleChange} value={bookToEdit.authors}/>
    <br></br>
    <label htmlFor="book-description">Book Description</label>
    <input type="text" id="book-description" placeholder="book description..." name="description" onChange={handleChange} value={bookToEdit.description}/>
    <br></br>
    <label htmlFor="book-price">Book Price</label>
    <input type="text" id="book-price" placeholder="book price..." name="price" onChange={handleChange} value={bookToEdit.listPrice.amount}/>
    <br></br>
    <label htmlFor="book-pages">Number of pages</label>
    <input type="text" id="book-pages" placeholder="number of pages..." name="pageCount" onChange={handleChange} value={bookToEdit.pageCount}/>
    <br></br>
    <button onClick={onSaveBook}>Add Book</button>
    <Link to="/book">Go Back</Link>

</form>
}