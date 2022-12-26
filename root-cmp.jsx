const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

import { BookDetails} from "./views/book-details.jsx"
import { Header } from "./cmps/header.jsx"
import { About } from "./views/about.jsx"
import { Books } from "./views/books-index.jsx"
import { Home } from "./views/home.jsx"
import { EditBook } from "./views/edit-book.jsx"
import { UserMsg } from "./cmps/user-msg.jsx"

export function App() {

    return <Router>
        <section className="main-layout app">
            <Header />
            <main>
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<About />} path="/about" />
                    <Route element={<Books />} path="/book" />
                    <Route element={<BookDetails />} path="/book/details/:bookId" />
                    <Route element={<EditBook />} path="/book/edit" />
                    <Route element={<EditBook />} path="/book/edit/:bookId" />
                </Routes>
            </main>
            <UserMsg />
        </section>
    </Router>
}