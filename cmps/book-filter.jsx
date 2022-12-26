const { useState, useEffect } = React

import { BookService } from "../services/book.service.js"


export function BookFilter({onSetFilter}){
    const [filterBy , setFilterBy] = useState(BookService.getDefaultFilter())
    useEffect(()=> {
        onSetFilter(filterBy)
    }
    ,[filterBy])

    function handleChange({target}){
        let { value, name: field } = target
        setFilterBy((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }
   
    return <form className="filter-form">
        <label htmlFor="search">Search</label>
            <input type="text"
                id="search"
                name="title"
                placeholder="By title"
                value={filterBy.title}
                onChange={handleChange}
            />

            <label htmlFor="minPrice">Price</label>
            <input type="range"
                id="minPrice"
                name="minPrice"
                min="0" 
                max="200" 
                step="1"
                value={filterBy.minPrice || 50}
                onChange={handleChange}
                title={filterBy.minPrice+'' || 50}
            />
    </form>
}