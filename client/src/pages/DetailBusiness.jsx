import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetailHome } from '../store/detailBusinessSlice'
import LoadingScreen from '../components/LoadingScreen'
import GalleryImages from '../components/detailPage/GalleryImages'
import { CiMap, CiPhone } from "react-icons/ci";
import { TfiPencilAlt } from "react-icons/tfi";

const DetailBusiness = () => {
  let { aliasBusiness } = useParams()
  let dispatch = useDispatch()
  let { dataDetailBusiness, isLoading } = useSelector((state) => state.detailBusinessSlice)

  useEffect(() => {
    dispatch(fetchDetailHome(aliasBusiness))
  }, [])

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="py-6 bg-base-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                  <GalleryImages
                    dataDetailBusiness={dataDetailBusiness}
                  />
                </div>
                <div className="md:flex-1 px-4">
                  <div className="mockup-window bg-base-100">
                    <div className="px-6 py-8 bg-base-300">
                      <h2 className=" leading-tight tracking-tight font-bold font-serif text-2xl md:text-3xl">{dataDetailBusiness.name}</h2>
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

                      <div>
                        <a
                          href={dataDetailBusiness?.url}
                          target='_blank'
                          className='mr-2 p-2 btn-sm text-center rounded-2xl bg-base-100 hover:bg-base-200'
                        >
                          Visit Web
                        </a>
                        <a
                          href={`https://www.google.com/maps?q=${dataDetailBusiness?.coordinates?.latitude},${dataDetailBusiness?.coordinates?.longitude}`}
                          target='_blank'
                          className='p-2 btn-sm text-center rounded-2xl bg-base-100 hover:bg-base-200'
                        >
                          View on Google Maps
                        </a>

                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center md:justify-start items-center space-x-4 my-4">
                    <div>
                      <span className="indicator-item badge badge-base-content">Maps: </span>
                      <div className="rounded-lg bg-base-300 flex py-2 px-3">
                        <span className="font-bold text-3xl">{dataDetailBusiness.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-justify md:mt-11 mt-4">
                    <p>{dataDetailBusiness.excerpt}</p>
                    <p className="mt-3">
                      <span className="font-semibold">Description : </span>
                      {dataDetailBusiness.description}
                    </p>
                  </div>

                  <div className="flex py-4">
                    <button className='btn bg-base-300'>button</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default DetailBusiness