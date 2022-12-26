const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { LongText } from "../cmps/long-txt.jsx"

import { BookService } from "../services/book.service.js"
import { AddReview } from "./add-review.jsx"

export function BookDetails() {
    const [book, setBook] = useState(null)
    const [isReview, setIsReview] = useState(null)
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        BookService.get(bookId)
            .then((book) => setBook(book))
            .catch((err) => {
                console.log('Had issues in car details', err)
                navigate('/book')
            })
    }

    function onDeleteReview(bookId, idx) {
        BookService.deleteReview(bookId, idx).then(book => setBook(book))
    }


    if (!book) return <h3>Loading...</h3>
    return <section className="book-details">
        <h1>{book.title}</h1>
        <h3><span>Authors</span> : {book.authors[0]}</h3>
        <h2>{book.subtitle}</h2>
        <img src={book.thumbnail} />
        <h4 className="book-pages">{book.pageCount} pages <span>{(book.pageCount > 500) ? '-Serious Reading' : (book.pageCount > 200) ? '-Decent Reading' : (book.pageCount < 100) ? '-Light Reading' : ''}</span></h4>
        <LongText txt={book.description} length="100" />
        <h4>Published Date -{book.publishedDate}</h4>
        {(isReview)&& <AddReview setIsReview={setIsReview} setBook={setBook} />}
        {book.reviews && book.reviews.length >0 &&
            <div>
                <h2>Reviews</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Rate</th>
                            <th>Date</th>
                            <th>Delete</th>
                        </tr>
                        {book.reviews.map((review, idx) => {
                            return <tr key={idx}>
                                <td>{review.fullName}</td>
                                <td>{review.rate}</td>
                                <td>{review.date}</td>
                                <td><button onClick={() => onDeleteReview(book.id, idx)}>Delete</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>}
        <div className="links">
            <button onClick={()=>setIsReview(true)}>Add Review</button>
            <Link to="/book">Go Back</Link>
        </div>
    </section>
}