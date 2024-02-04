import React, { useRef } from 'react'
import { IoSearch } from "react-icons/io5"

const InputSearch = ({ setTerm, setOffset }) => {
  let searchRef = useRef()

  function handleSearch() {
    let searchTerm = searchRef.current.value.trim()
    if (searchTerm.length > 0) {
      setTerm(searchTerm)
      setOffset(0)
    }
  }

  return (
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
  )
}

export default InputSearch