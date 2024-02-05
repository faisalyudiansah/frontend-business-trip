import React from 'react'
import { useSelector } from 'react-redux'

const HeaderHome = () => {
  let { fetchTerm, fetchCategory } = useSelector((state) => state.appSlice)
  
  return (
    <>
      <h2 className='text-2xl font-bold text-center mb-10 font-serif'>
        List Business "New York"
      </h2>
      <div className='text-center'>
        {fetchTerm && !fetchCategory && `Search Results for "${fetchTerm}"`}
        {!fetchTerm && fetchCategory && `Search Results for category "${fetchCategory}"`}
        {fetchTerm && fetchCategory && `Search Results for "${fetchTerm}" and Category "${fetchCategory}"`}
      </div>
    </>
  )
}

export default HeaderHome