import React from 'react'
import { GoogleMap, Marker, useLoadScript, LoadScript, OverlayView } from '@react-google-maps/api'

const GoogleMaps = ({ center, fetchBusiness, setLatitude, setLongitude, setRadius, setCenter }) => {
  function scrollPageToTop() {
    scrollTo({
      behavior: 'smooth',
      top: 0
    })
  }

  let { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY
  })

  if (loadError) {
    return <div>Error loading maps</div>
  }
  if (!isLoaded) {
    return <div>Loading maps</div>
  }

  function handleMapClick(event) {
    setCenter({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    })
    setLatitude(event.latLng.lat())
    setLongitude(event.latLng.lng())
    setRadius(500)
  }

  return (
    <div className='bg-base-100 p-5 rounded-xl mb-5'>
      <div className='flex justify-between items-center mb-4'>
        <p>Search by nearby location "500m"</p>
        <button onClick={() => {
          scrollPageToTop()
          fetchBusiness()
        }} className='btn bg-base-300 hover:bg-base-200'>Select this area</button>
      </div>
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        zoom={12}
        center={center}
        onClick={handleMapClick}
      >
        <OverlayView position={center} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <Marker position={center} />
        </OverlayView>
      </GoogleMap>
    </div >
  )
}

export default GoogleMaps