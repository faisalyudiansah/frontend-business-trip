import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePayloadOffset, changePayloadSortBy, fetchBusiness } from '../../../store/appSlice'

const SortBy = () => {
  let dispatch = useDispatch()
  let { fetchSortBy } = useSelector((state) => state.appSlice)

  function scrollPageToTop() {
    scrollTo({
      behavior: 'smooth',
      top: 0
    })
  }

  function getLabelTextSortBy(filter) {
    switch (filter) {
      case 'distance':
        return 'Distance'
      case 'rating':
        return 'Rating'
      case 'review_count':
        return 'Review Count'
      case 'best_match':
        return 'Best Match'
      default:
        return filter
    }
  }
  return (
    <div className='bg-base-100 p-5 rounded-xl mb-5'>
      {['distance', 'rating', 'review_count', 'best_match'].map((filter, i) => (
        <div className="form-control" key={i}>
          <label className="label cursor-pointer">
            <span className={"label-text" + (filter === fetchSortBy ? " font-bold" : '')}>
              {getLabelTextSortBy(filter)}
            </span>
            <input
              type="radio"
              onClick={() => {
                scrollPageToTop()
                dispatch(changePayloadOffset(0))
                dispatch(changePayloadSortBy(filter))
                dispatch(fetchBusiness())
              }}
              name="radio-sortBy"
              className="radio"
              defaultChecked={filter === fetchSortBy}
            />
          </label>
        </div>
      ))}
    </div>
  )
}

export default SortBy