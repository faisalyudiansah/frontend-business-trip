import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardBusiness from '../components/CardBusiness'
import Pagination from '../components/homepage/Pagination'
import LoadingScreen from '../components/LoadingScreen'
import InputSearch from '../components/homepage/InputSearch'
import NotFoundWarning from '../components/NotFoundWarning'
import SortBy from '../components/homepage/filterComponents/SortBy'
import SearchCategory from '../components/homepage/filterComponents/SearchCategory'
import GoogleMaps from '../components/homepage/filterComponents/GoogleMaps'
import { IoFilterOutline } from "react-icons/io5"

const Home = () => {
  let [location, setLocation] = useState(`newyork`)
  let [limit, setLimit] = useState(8)
  let [offset, setOffset] = useState(0)
  let [businesses, setBusinesses] = useState({})
  let [term, setTerm] = useState('')
  let [sortBy, setSortBy] = useState('best_match')
  let [category, setCategory] = useState('')
  let [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  })
  let [latitude, setLatitude] = useState(0)
  let [longitude, setLongitude] = useState(0)
  let [radius, setRadius] = useState(40000)
  let [loading, setLoading] = useState(true)
  let [searchNearby, setSearchNearby] = useState(false)

  async function fetchBusiness() {
    try {
      setLoading(true)
      let url = `${import.meta.env.VITE_BASE_URL}/businesses/search?limit=${limit}&offset=${offset}`
      let { data } = await axios({
        method: 'get',
        params: {
          location,
          radius,
          latitude,
          longitude,
          term,
          categories: category,
          sort_by: sortBy,
        },
        url,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      })
      setBusinesses(data)
      setCenter({
        lat: data.region.center.latitude,
        lng: data.region.center.longitude,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setSearchNearby(false)
    fetchBusiness()
  }, [offset, term, sortBy, category, searchNearby])

  return (
    <section id="business" className='bg-base-100 p-10 min-h-screen'>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className='mb-14'>
            <h2 className='text-2xl font-bold text-center mb-10 font-serif'>List Business "New York"</h2>
            <InputSearch setTerm={setTerm} setOffset={setOffset} />
            <div className='flex justify-center items-center'>
              <div className="collapse rounded-2xl hover:bg-base-200 w-[700px] shadow-md bg-base-300 mb-7">
                <input type="checkbox" />
                <div className="collapse-title ">
                  <div className='text-lg text-center font-bold flex justify-center items-center gap-2 ml-6'>
                    <IoFilterOutline size={24} />
                    FILTER
                  </div>
                </div>
                <div className="collapse-content mx-5">
                  <SortBy setSortBy={setSortBy} sortBy={sortBy} />
                  <SearchCategory setCategory={setCategory} setOffset={setOffset} />
                  <GoogleMaps
                    center={center}
                    fetchBusiness={fetchBusiness}
                    setLatitude={setLatitude}
                    setLongitude={setLongitude}
                    setRadius={setRadius}
                    setCenter={setCenter}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-wrap items-center justify-center gap-10'>
              {businesses.businesses.length === 0 ? (
                <NotFoundWarning />
              ) : (
                businesses.businesses.map(business => (
                  <CardBusiness
                    key={business.id}
                    business={business}
                  />
                ))
              )}
            </div>
          </div>
          <Pagination page={offset} lastPage={businesses.total} setOffset={setOffset} />
        </>
      )
      }
    </section >
  )
}

export default Home