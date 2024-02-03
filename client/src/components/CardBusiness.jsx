import React from 'react'
import { CiLocationOn } from "react-icons/ci"

const CardBusiness = ({ business }) => {
  return (
    <div className="card w-80 h-[450px] bg-base-300 shadow-lg">
      <figure className='h-52'>
        <img
          src={business.image_url}
          className='object-cover zoom-image'
          alt={business.alias}
        />
      </figure>
      <div className="card-body flex-col justify-between">
        <h2 className="card-title">
          {business.name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <div className='flex items-center gap-2'>
          <CiLocationOn className='text-2xl' />
          <div className='text-sm'>{business.location.display_address.join(', ')}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className="card-actions justify-start">
            {business.categories.map((ctg, index) => (
              <div key={index} className="badge badge-outline">{ctg.title}</div>
            ))}
          </div>
          <div className="card-actions justify-end">
            <button className="btn rounded-xl bg-base-200 hover:bg-base-100 w-16 text-center">Detail</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardBusiness