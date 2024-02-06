import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetailHome } from '../store/detailBusinessSlice'
import LoadingScreen from '../components/LoadingScreen'
import GalleryImages from '../components/detailPage/GalleryImages'

import MockupBusiness from '../components/detailPage/MockupBusiness'
import Transactions from '../components/detailPage/Transactions'
import ReviewSection from '../components/detailPage/ReviewSection'
import MapsDetailPage from '../components/detailPage/MapsDetailPage'

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
                  <GalleryImages dataDetailBusiness={dataDetailBusiness} />
                </div>
                <div className="md:flex-1 px-4">
                  <MockupBusiness dataDetailBusiness={dataDetailBusiness} />
                  {dataDetailBusiness?.transactions?.length !== 0 && (
                    <Transactions dataDetailBusiness={dataDetailBusiness} />
                  )}
                </div>
              </div>
              <ReviewSection aliasBusiness={aliasBusiness} />
              <MapsDetailPage />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default DetailBusiness