import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePayloadOffset, fetchBusiness } from '../../store/appSlice'

const Pagination = ({ lastPage }) => {
  let dispatch = useDispatch()
  let { fetchOffset } = useSelector((state) => state.appSlice)

  function scrollPageToTop() {
    scrollTo({
      behavior: 'smooth',
      top: 0
    })
  }

  function handleNextPagination() {
    if (lastPage !== 0 && fetchOffset + 1 !== lastPage) {
      dispatch(changePayloadOffset(fetchOffset + 1))
      scrollPageToTop()
      dispatch(fetchBusiness())
    }
  }

  function handlePrevPagination() {
    if (fetchOffset > 0) {
      dispatch(changePayloadOffset(fetchOffset - 1))
      scrollPageToTop()
      dispatch(fetchBusiness())
    }
  }

  return (
    <>
      <div className='flex justify-center items-center gap-4 mb-5'>
        <button
          onClick={handlePrevPagination}
          className={`p-2 rounded-lg ${fetchOffset === 0 ? 'bg-gray-800 cursor-not-allowed text-neutral-500' : 'bg-base-300  hover:bg-base-200'}`}
        >
          Prev
        </button>
        <p>{fetchOffset + 1} of {lastPage}</p>
        <button
          onClick={handleNextPagination}
          className={`p-2 rounded-lg ${fetchOffset === lastPage || fetchOffset + 1 === lastPage ? 'bg-gray-800 cursor-not-allowed text-neutral-500' : 'bg-base-300  hover:bg-base-200'}`}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default Pagination