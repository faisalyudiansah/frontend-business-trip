import React, { useEffect, useState } from 'react'
import CardBusiness from '../components/CardBusiness'
import axios from 'axios'
import Pagination from '../components/homepage/Pagination'

const Home = () => {
  let [location, useLocation] = useState(`newyork`)
  let [limit, useLimit] = useState(8)
  let [offset, useOffset] = useState(0)
  let [businesses, setBusinesses] = useState({})
  let [loading, setLoading] = useState(true)

  async function fetchBusiness() {
    try {
      setLoading(true)
      let link = `${import.meta.env.VITE_BASE_URL}/businesses/search?location=${location}&limit=${limit}&offset=${offset}`
      let { data } = await axios({
        method: 'get',
        url: link,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      })
      setBusinesses(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBusiness()
  }, [offset])

  return (
    <section id="products" className='bg-base-100 p-10 min-h-screen'>
      {loading ? (
        <div className="m-10">
          <div className="mockup-window border bg-base-200 p-10 flex flex-col items-center">
            <h2 className="font-bold flex justify-center font-serif mb-7 text-2xl text-primary-500">Loading...</h2>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      ) : (
        <>
          <div className='mb-14'>
            <div>
              <h2 className='text-2xl font-bold text-center mb-10 font-serif'>List Business</h2>
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
          <Pagination page={offset} lastPage={businesses.total} setPage={useOffset}/>
        </>
      )}
    </section>
  )
}

export default Home