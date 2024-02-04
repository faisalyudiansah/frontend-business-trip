import React, { useRef } from 'react'

const SearchCategory = ({ setCategory, setOffset }) => {
  let categoryRef = useRef()

  function handleSearchCategories() {
    let searchCategory = categoryRef.current.value.trim()
    if (searchCategory.length > 0) {
      setCategory(searchCategory)
      setOffset(0)
    }
  }

  return (
    <div className='bg-base-100 p-5 rounded-xl mb-5'>
      <div className='flex justify-between items-center'>
        <p>Categories</p>
        <input
          type="text"
          className='p-2 pl-4 rounded-xl bg-base-300 outline-none'
          name="categories"
          placeholder="search category..."
          id="categories"
          ref={categoryRef}
          onKeyUp={(e) => e.key === 'Enter' && handleSearchCategories()}
        />
      </div>
    </div>
  )
}

export default SearchCategory