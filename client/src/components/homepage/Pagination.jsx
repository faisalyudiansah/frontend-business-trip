import React from 'react'

const Pagination = ({ page, setOffset, lastPage }) => {
  function scrollPageToTop() {
    scrollTo({
      behavior: 'smooth',
      top: 0
    })
  }

  function handleNextPagination() {
    if (lastPage !== 0) {
      setOffset((prevState) => prevState + 1)
      scrollPageToTop()
    }
  }

  function handlePrevPagination() {
    if (page > 0) {
      setOffset((prevState) => prevState - 1)
      scrollPageToTop()
    }
  }

  return (
    <>
      <div className='flex justify-center items-center gap-4 mb-5'>
        <button
          onClick={handlePrevPagination}
          className={`p-2 rounded-lg ${page === 0 ? 'bg-gray-800 cursor-not-allowed text-neutral-500' : 'bg-base-300  hover:bg-base-200'}`}
        >
          Prev
        </button>
        <p>{page + 1} of {lastPage}</p>
        <button
          onClick={handleNextPagination}
          className={`p-2 rounded-lg ${lastPage === 0 ? 'bg-gray-800 cursor-not-allowed text-neutral-500' : 'bg-base-300  hover:bg-base-200'}`}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default Pagination