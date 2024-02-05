import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { changePayloadCategory, changePayloadOffset, fetchBusiness } from '../../../store/appSlice'

const SearchCategory = () => {
  let dispatch = useDispatch()
  let categoryRef = useRef()

  function scrollPageToTop() {
    scrollTo({
      behavior: 'smooth',
      top: 0
    })
  }

  function handleSearchCategories() {
    let searchCategory = categoryRef.current.value.trim()
    if (searchCategory.length > 0) {
      scrollPageToTop()
      dispatch(changePayloadOffset(0))
      dispatch(changePayloadCategory(searchCategory))
      dispatch(fetchBusiness())
    }
  }

  return (
    <div className='bg-base-100 p-5 rounded-xl mb-5'>
      <div className='flex-row md:flex justify-between items-center'>
        <p>Categories</p>
        <input
          type="text"
          className='p-2 pl-4 rounded-xl w-full md:w-80 mt-2 md:mt-0 bg-base-300 outline-none'
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