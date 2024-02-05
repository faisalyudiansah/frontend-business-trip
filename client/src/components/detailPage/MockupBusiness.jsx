import React from 'react'
import { CiMap, CiPhone } from "react-icons/ci";
import { TfiPencilAlt } from "react-icons/tfi";
import { TbMapShare } from "react-icons/tb";
import { FaExternalLinkAlt } from "react-icons/fa";

const MockupBusiness = ({ dataDetailBusiness }) => {
  return (
    <div className="mockup-window bg-base-100">
      <div className="px-6 py-8 bg-base-300">
        <h2 className=" leading-tight tracking-tight font-bold font-serif text-2xl md:text-3xl">{dataDetailBusiness?.name}</h2>
        <div className='flex items-center mb-5'>
          <p>Rating:&nbsp;</p>
          <div className="rating rating-md rating-half">
            {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value, index) => (
              <input
                key={index}
                type="radio"
                name="rating-10"
                className={`bg-orange-500 mask mask-star-2 ${index % 2 === 0 ? 'mask-half-1' : 'mask-half-2'
                  }`}
                checked={dataDetailBusiness.rating >= value}
                disabled
              />
            ))}
          </div>
        </div>

        <div className='mb-10'>
          <div className='flex items-center gap-2'>
            <CiMap size={25} />
            <div className='text-sm'>{dataDetailBusiness?.location?.display_address.join(', ')}</div>
          </div>
          <div className='flex items-center gap-2'>
            <CiPhone size={25} />
            <div className='text-sm'>{dataDetailBusiness?.display_phone}</div>
          </div>
          <div className='flex items-center gap-2 ml-1'>
            <TfiPencilAlt size={18} />
            <div className='text-sm ml-1'>{dataDetailBusiness?.review_count} Reviews</div>
          </div>
          <div className="card-actions justify-start mt-4">
            {dataDetailBusiness?.categories?.map((ctg, index) => (
              <div key={index} className="badge badge-outline">{ctg.title}</div>
            ))}
          </div>
        </div>

        <div className='flex items-center'>
          <a
            href={dataDetailBusiness?.url}
            target='_blank'
            className='mr-2 p-2 btn-sm text-center rounded-2xl bg-base-100 hover:bg-base-200 max-w-28  flex items-center justify-center'
          >
            <span className="mr-2"><FaExternalLinkAlt /></span>
            Visit Web
          </a>
          <a
            href={`https://www.google.com/maps?q=${dataDetailBusiness?.coordinates?.latitude},${dataDetailBusiness?.coordinates?.longitude}`}
            target='_blank'
            className='p-2 btn-sm text-center rounded-2xl bg-base-100 hover:bg-base-200 max-w-48  flex items-center justify-center'
          >
            <span className="mr-2"><TbMapShare size={18} /></span>
            See on Google Maps
          </a>
        </div>
      </div>
    </div>
  )
}

export default MockupBusiness