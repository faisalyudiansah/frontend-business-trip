import React from 'react'
import SortBy from './filterComponents/SortBy'
import SearchCategory from './filterComponents/SearchCategory'
import GoogleMaps from './filterComponents/GoogleMaps'
import { IoFilterOutline } from "react-icons/io5"

const Filter = () => {
  return (
    <div className='flex justify-center items-center'>
      <div className="collapse rounded-2xl hover:bg-base-200 w-[700px] shadow-md bg-base-300 mb-7">
        <input type="checkbox" />
        <div className="collapse-title ">
          <div className='text-lg text-center font-bold flex justify-center items-center gap-2 ml-6'>
            <IoFilterOutline size={24} />
            FILTER
          </div>
        </div>
        <div className="collapse-content mx-5">
          <SortBy />
          <SearchCategory />
          <GoogleMaps />
        </div>
      </div>
    </div>
  )
}

export default Filter