import React, { useEffect, useState } from 'react'
import CardBusiness from '../components/homepage/CardBusiness'
import Pagination from '../components/homepage/Pagination'
import LoadingScreen from '../components/LoadingScreen'
import InputSearch from '../components/homepage/InputSearch'
import NotFoundWarning from '../components/homepage/NotFoundWarning'
import Filter from '../components/homepage/Filter'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBusiness } from '../store/appSlice'
import HeaderHome from '../components/homepage/HeaderHome'

const Home = () => {
  let dispatch = useDispatch()
  let { dataBusiness, isLoading } = useSelector((state) => state.appSlice)

  useEffect(() => {
    dispatch(fetchBusiness())
  }, [])

  return (
    <section id="business" className='bg-base-100 p-10 min-h-screen'>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className='mb-14'>
            <HeaderHome />
            <InputSearch />
            <Filter />
            <div className='flex flex-wrap items-center justify-center gap-10'>
              {dataBusiness?.businesses?.length === 0 ? (
                <NotFoundWarning />
              ) : (
                dataBusiness?.businesses?.map(business => (
                  <CardBusiness
                    key={business.id}
                    business={business}
                  />
                ))
              )}
            </div>
          </div>
          <Pagination lastPage={dataBusiness?.total} />
        </>
      )
      }
    </section >
  )
}

export default Home