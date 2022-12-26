
const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState,useEffect } = React

import { BookService } from "../services/book.service.js"
import { eventBusService } from "../services/event-bus.service.js"


export function AddReview({setIsReview,setBook}) {
    const [review, setReview] = useState({ fullName: '', rate: '', date: '' })
    const {bookId} = useParams()
    
    function handleChange({ target }) {
        let { value, name: field } = target
        if(value.typeOf === "number") value = +value
        setReview((prevReview)=>({...prevReview , [field]:value}))
    }

    function onSaveReview(ev) {
        ev.preventDefault()
        BookService.addReview(bookId,review).then((book)=>{
            eventBusService.emit('show-user-msg','Added Review Successfully')
            setIsReview(false)
            setBook(book)
        })


    }

    if(!bookId) return <h3>Loading...</h3>
    return <form onSubmit={onSaveReview}
        className="book-edit">
        <h1>Add a Review</h1>
        <label htmlFor="user-name">Full Name</label>
        <input type="text" id="user-name" placeholder="your name..." name="fullName" onChange={handleChange} value={review.fullName} />
        <br></br>
        <label htmlFor="rate">Rate</label>
        <input type="number" id="rate" placeholder="0" name="rate" max="5" min="0" onChange={handleChange} value={review.rate} />
        <br></br>
        <label htmlFor="read-at">Date</label>
        <input type="date" id="read-at" name="date" onChange={handleChange} value={review.date} />
        <br></br>
        <button onSubmit={onSaveReview}>Save</button>
        <button onClick={()=>setIsReview(false)}>Cancel</button>
       
    </form>
}
