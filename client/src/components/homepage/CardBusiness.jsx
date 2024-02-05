import React from 'react'
import { CiMap } from "react-icons/ci";
import { GiPathDistance } from "react-icons/gi"
import { TfiPencilAlt } from "react-icons/tfi";
import { Link } from "react-router-dom";

const CardBusiness = ({ business }) => {
  return (
    <div className="card w-96 h-[450px] bg-base-300 shadow-lg">
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
          <div className="badge badge-secondary">{business.rating}</div>
        </h2>
        <div>
          <div className='flex items-center gap-2'>
            <CiMap size={25} />
            <div className='text-sm'>{business.location.display_address.join(', ')}</div>
          </div>
          <div className='flex items-center gap-2 ml-1'>
            <GiPathDistance size={18} />
            <div className='text-sm ml-1'>{business.distance.toFixed(0)} Meter</div>
          </div>
          <div className='flex items-center gap-2 ml-1'>
            <TfiPencilAlt size={18} />
            <div className='text-sm ml-1'>{business.review_count} Reviews</div>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div className="card-actions justify-start">
            {business.categories.map((ctg, index) => (
              <div key={index} className="badge badge-outline">{ctg.title}</div>
            ))}
          </div>
          <div className="card-actions justify-end">
            <Link to={`/${business.alias}`} className="btn rounded-xl bg-base-200 hover:bg-base-100 w-16 text-center">Detail</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardBusiness