import React from 'react'

const SortBy = ({ setSortBy, sortBy }) => {

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
            <span className={"label-text" + (filter === sortBy ? " font-bold" : '')}>
              {getLabelTextSortBy(filter)}
            </span>
            <input
              type="radio"
              onClick={() => setSortBy(filter)}
              name="radio-sortBy"
              className="radio"
              defaultChecked={filter === sortBy}
            />
          </label>
        </div>
      ))}
    </div>
  )
}

export default SortBy