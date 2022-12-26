const { Link } = ReactRouterDOM

export function BooksList({ books, onRemoveBook}) {
    if (books.length === 0 ) return <h3>No books to show...</h3>
    return <div className="books-list">
            {books.map(book => {
                const { listPrice } = book
                const price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: listPrice.currencyCode }).format(listPrice.amount)
                return <div className="book" key={book.id} >
                    <h2>{book.title}</h2>
                    <img className="book-img" src={book.thumbnail} />
                    <p className={(listPrice.amount>150)? 'red': (listPrice.amount<20)?'green' : ''}  >{price}</p>
                    <h4>{listPrice.isOnSale && 'On Sale!'} </h4>
                    <Link to={`/book/details/${book.id}`}>Details</Link>
                    <Link to={`/book/edit/${book.id}`}>Edit</Link>
                    <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                </div>
            })}
        </div>
    
}