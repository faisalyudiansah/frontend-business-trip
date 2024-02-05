import React, { useRef } from 'react'
import { IoSearch } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux'
import { changeFetchTerm, changePayloadOffset, fetchBusiness, resetSearchAndFilter } from '../../store/appSlice'
import { MdOutlineRefresh } from "react-icons/md";

const InputSearch = () => {
  let dispatch = useDispatch()
  let { fetchTerm, fetchCategory } = useSelector((state) => state.appSlice)
  let searchRef = useRef()

  function handleSearch() {
    let searchTerm = searchRef.current.value.trim()
    if (searchTerm.length > 0) {
      dispatch(changePayloadOffset(0))
      dispatch(changeFetchTerm(searchTerm))
      dispatch(fetchBusiness())
    }
  }

  function resetHandler() {
    dispatch(resetSearchAndFilter())
    dispatch(fetchBusiness())
  }

  return (
    <div className='flex justify-center items-center mb-4 mt-2'>
      <div className='relative'>
        <input
          className='w-80 md:w-96 p-1 rounded-xl bg-base-300 outline-none placeholder-base-100 hover:shadow-md'
          style={{ textIndent: '10px' }}
          placeholder='Search business...'
          ref={searchRef}
          onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className='absolute top-1 end-2'>
          <IoSearch
            className='text-base-primary-content hover:text-base-100 hover:scale-110'
            size={24}
            onClick={handleSearch}
          />
        </button>
      </div>
      {fetchTerm || fetchCategory ? (
        <div className='flex justify-center items-center mx-2'>
          <button onClick={resetHandler} className='text-center rounded-xl btn-sm bg-base-300 hover:bg-base-200'>
            <MdOutlineRefresh size={25} />
          </button>
        </div>
      ) : (null)}
    </div>
  )
}

export default InputSearch