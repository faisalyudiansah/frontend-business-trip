import React from 'react'
import { GoogleMap, Marker, useLoadScript, OverlayView } from '@react-google-maps/api'
import { useSelector } from 'react-redux'

const MapsDetailPage = () => {
    let { locationCenterDetailMap } = useSelector((state) => state.detailBusinessSlice)
    let { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY
    })

    if (loadError) {
        return <div>Error loading maps</div>
    }
    if (!isLoaded) {
        return <div>Loading maps</div>
    }

    return (
        <div className='mt-8'>
            <GoogleMap
                mapContainerStyle={{ height: '400px', width: '100%' }}
                zoom={12}
                center={locationCenterDetailMap}
            >
                <OverlayView position={locationCenterDetailMap} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                    <Marker position={locationCenterDetailMap} />
                </OverlayView>
            </GoogleMap>
        </div >
    )
}

export default MapsDetailPage