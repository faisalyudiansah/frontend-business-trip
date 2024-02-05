import React from 'react'

const ReviewCard = ({ review }) => {
  function formatLocalDate(dateString) {
    let date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div class="flex flex-col gap-3 mt-2">
      <div class="flex flex-col gap-4 bg-base-300 rounded-xl p-4">
        <div class="flex justify justify-between">
          <a
            href={review?.user?.profile_url}
            target='_blank'
            className='flex gap-3 underline underline-offset-4 font-semibold'
          >
            <img
              className="w-10 h-10 text-center rounded-full"
              src={review?.user?.image_url}
              alt="Profile Picture"
            />
            <span>{review.user.name}</span>
          </a>
          <div className='flex items-center mb-5'>
            <p>Rating: {review.rating} &nbsp;</p>
            <div className="rating rating-md rating-half">
              {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value, index) => (
                <input
                  key={index}
                  type="radio"
                  name={`rating-${review?.id}`}
                  className={`bg-orange-500 mask mask-star-2 ${index % 2 === 0 ? 'mask-half-1' : 'mask-half-2'
                    }`}
                  checked={review?.rating >= value}
                  disabled
                />
              ))}
            </div>
          </div>
        </div>
        <p>{review.text}</p>
        <div class="flex justify-between">
          <span className='text-sm'>{formatLocalDate(review.time_created)}</span>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard