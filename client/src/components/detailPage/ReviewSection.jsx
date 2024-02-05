import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReviewBusiness } from '../../store/detailBusinessSlice'
import LoadingScreen from '../LoadingScreen'
import ReviewCard from './ReviewCard'

const ReviewSection = ({ aliasBusiness }) => {
  let dispatch = useDispatch()
  let { dataReviewBusiness, isLoadingReview } = useSelector((state) => state.detailBusinessSlice)

  useEffect(() => {
    dispatch(fetchReviewBusiness(aliasBusiness))
  }, [])

  return (
    <>
      {isLoadingReview ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="text-justify mt-4">
            <h1 className='font-bold text-2xl font-serif'>Reviews:</h1>
          </div>
          {dataReviewBusiness?.reviews?.map(review => (
            <ReviewCard key={review?.id} review={review} />
          ))}
        </>
      )}
    </>
  )
}

export default ReviewSection