const { NavLink } = ReactRouterDOM

export function Header(){

    return <header className="app-header full main-layout">
            <h1>React Car App</h1>
            <nav className="app-nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/Book">Books</NavLink>
            </nav>
        </header>
}