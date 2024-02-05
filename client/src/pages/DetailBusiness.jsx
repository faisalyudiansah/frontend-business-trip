import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetailHome } from '../store/detailBusinessSlice'
import LoadingScreen from '../components/LoadingScreen'

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
          {dataDetailBusiness && (
            <div>{dataDetailBusiness.name}</div>
          )}
        </>
      )}
    </>
  )
}

export default DetailBusiness