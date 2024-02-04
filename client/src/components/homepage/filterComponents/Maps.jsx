import React from 'react'
import GoogleMapReact from 'google-map-react'
import { HiLocationMarker } from "react-icons/hi"

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

const Maps = ({ center, fetchBusiness, setLatitude, setLongitude, setRadius, setCenter, latitude, longitude }) => {
  function handleMapChange({ center }) {
    setLatitude(center.lat)
    setLongitude(center.lng)
    setRadius(500)
  }

  function startSearchNearby() {
    setCenter({
      lat: 0,
      lng: 0,
    })
    fetchBusiness()
  }

  return (
    <div className='bg-base-100 p-5 rounded-xl mb-5'>
      <div className='flex justify-between items-center mb-4'>
        <p>Search by nearby location "500m"</p>
        <button onClick={startSearchNearby} className='btn bg-base-300 hover:bg-base-200'>Search here</button>
      </div>
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_KEY }}
          defaultCenter={center}
          onChange={(e) => {
            console.log('berubahhh')
            handleMapChange(e)
          }}
          defaultZoom={11}
        >
          <MarkerIcon
            lat={center.lat}
            lng={center.lng}
          />
        </GoogleMapReact>
      </div>
    </div>
  )
}

export default Maps