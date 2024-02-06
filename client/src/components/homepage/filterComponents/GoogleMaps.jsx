import React from 'react'
import { GoogleMap, Marker, useLoadScript, OverlayView } from '@react-google-maps/api'
import { useDispatch, useSelector } from 'react-redux'
import { changeLocationMaps, changePayloadOffset, fetchBusiness } from '../../../store/appSlice'

const GoogleMaps = () => {
  let dispatch = useDispatch()
  let { locationCenter } = useSelector((state) => state.appSlice)

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
    let newLat = event.latLng.lat()
    let newLng = event.latLng.lng()
    let newPosition = {
      lat: newLat,
      lng: newLng
    }
    dispatch(changeLocationMaps(newPosition, newLat, newLng))
  }

  return (
    <div className='bg-base-100 p-5 rounded-xl mb-5'>
      <div className='flex-row md:flex justify-between items-center mb-4'>
        <div className='flex-row'>
          <p>Search by nearby location "500m"</p>
          <p className='text-sm font-semibold'>Click on map</p>
        </div>
        <button onClick={() => {
          scrollPageToTop()
          dispatch(changePayloadOffset(0))
          dispatch(fetchBusiness())
        }} className='btn bg-base-300 hover:bg-base-200 mt-4 md:mt-0 w-full md:w-36'>Select this area</button>
      </div>
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        zoom={12}
        center={locationCenter}
        onClick={handleMapClick}
      >
        <OverlayView position={locationCenter} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <Marker position={locationCenter} />
        </OverlayView>
      </GoogleMap>
    </div >
  )
}

export default GoogleMaps