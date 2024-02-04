import React, { useEffect, useState } from 'react'
import CardBusiness from '../components/CardBusiness'
import axios from 'axios'
import Pagination from '../components/homepage/Pagination'
import LoadingScreen from '../components/LoadingScreen'
import InputSearch from '../components/homepage/InputSearch'
import { IoFilterOutline } from "react-icons/io5"
import GoogleMapReact from 'google-map-react'
import { HiLocationMarker } from "react-icons/hi"
import SortBy from '../components/homepage/filter/SortBy'
import SearchCategory from '../components/homepage/filter/SearchCategory'

const MarkerIcon = ({ lat, lng }) => {
  return (
    <HiLocationMarker
      size={30}
      color="red"
      lat={lat}
      lng={lng}
    />
  )
}

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

  function handleMapChange({ center }) {
    console.log(center, `<<<<`)
    console.log(center.lat, '<<<<')
    console.log(center.lng, '<<<<')
    setLatitude(center.lat)
    setLongitude(center.lng)
    setRadius(500)
  }

  function startSearchNearby() {
    setCenter({
      lat: latitude,
      lng: longitude,
    })
    fetchBusiness()
  }

  useEffect(() => {
    fetchBusiness()
  }, [offset, term, sortBy, category])

  return (
    <section id="products" className='bg-base-100 p-10 min-h-screen'>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className='mb-14'>
            <div>
              <h2 className='text-2xl font-bold text-center mb-10 font-serif'>List Business "New York"</h2>
            </div>
            <div className='flex justify-center mb-4'>
              <InputSearch setTerm={setTerm} setOffset={setOffset} />
            </div>
            <div className='flex justify-center items-center'>
              <div className="collapse rounded-2xl hover:bg-base-200 w-[600px] shadow-md bg-base-300 mb-7">
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
                  <div className='bg-base-100 p-5 rounded-xl mb-5'>
                    <div className='flex justify-between items-center mb-4'>
                      <p>Search by nearby location "500m"</p>
                      <button onClick={startSearchNearby} className='btn bg-base-300 hover:bg-base-200'>Search here</button>
                    </div>
                    <div style={{ height: '400px', width: '100%' }}>
                      <GoogleMapReact
                        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_KEY }}
                        defaultCenter={center}
                        defaultZoom={11}
                        onChange={handleMapChange}
                      >
                        <MarkerIcon
                          lat={center.lat}
                          lng={center.lng}
                        />
                      </GoogleMapReact>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-wrap items-center justify-center gap-10'>
              {businesses.businesses.map(business => (
                <CardBusiness
                  key={business.id}
                  business={business}
                />
              ))}
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