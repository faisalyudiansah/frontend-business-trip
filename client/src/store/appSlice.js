import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        dataBusiness: [],
        fetchlimit: 8,
        fetchOffset: 0,
        fetchLocation: 'newyork',
        fetchRadius: 40000,
        fetchLatitude: 0,
        fetchLongitude: 0,
        fetchTerm: '',
        fetchCategory: '',
        fetchSortBy: 'best_match',
        isLoading: false,
        locationCenter: {}
    },
    reducers: {
        changeDataBusiness: (state, action) => {
            state.dataBusiness = action.payload
        },
        changeIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        changeLocationCenter: (state, action) => {
            state.locationCenter = action.payload
        },
        changeFetchLimit: (state, action) => {
            state.fetchlimit = action.payload;
        },
        changeFetchOffset: (state, action) => {
            state.fetchOffset = action.payload;
        },
        changeFetchLocation: (state, action) => {
            state.fetchLocation = action.payload;
        },
        changeFetchRadius: (state, action) => {
            state.fetchRadius = action.payload;
        },
        changeFetchLatitude: (state, action) => {
            state.fetchLatitude = action.payload;
        },
        changeFetchLongitude: (state, action) => {
            state.fetchLongitude = action.payload;
        },
        changeFetchTerm: (state, action) => {
            state.fetchTerm = action.payload;
        },
        changeFetchCategory: (state, action) => {
            state.fetchCategory = action.payload;
        },
        changeFetchSortBy: (state, action) => {
            state.fetchSortBy = action.payload;
        },
    }
})

export const {
    changeDataBusiness,
    changeIsLoading,
    changeLocationCenter,
    changeFetchLimit,
    changeFetchOffset,
    changeFetchRadius,
    changeFetchLocation,
    changeFetchLatitude,
    changeFetchLongitude,
    changeFetchTerm,
    changeFetchCategory,
    changeFetchSortBy,
} = appSlice.actions

export function fetchBusiness() {
    return async (dispatch, getState) => {
        try {
            let {
                fetchlimit,
                fetchOffset,
                fetchLocation,
                fetchRadius,
                fetchLatitude,
                fetchLongitude,
                fetchTerm,
                fetchCategory,
                fetchSortBy
            } = getState().appSlice
            dispatch(changeIsLoading(true))
            let { data } = await axios({
                method: 'get',
                params: {
                    limit: fetchlimit,
                    offset: fetchOffset,
                    location: fetchLocation,
                    radius: fetchRadius,
                    latitude: fetchLatitude,
                    longitude: fetchLongitude,
                    term: fetchTerm,
                    categories: fetchCategory,
                    sort_by: fetchSortBy,
                },
                url: `${import.meta.env.VITE_BASE_URL}/businesses/search`,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
                }
            })
            dispatch(changeDataBusiness(data))
            dispatch(changeLocationCenter({
                lat: data.region.center.latitude,
                lng: data.region.center.longitude,
            }))
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(changeIsLoading(false))
        }
    }
}

export const changePayloadOffset = (offset) => async (dispatch) => dispatch(changeFetchOffset(offset))
export const changePayloadTerm = (term) => async (dispatch) => dispatch(changeFetchTerm(term))
export const changePayloadCategory = (category) => async (dispatch) => dispatch(changeFetchCategory(category))
export const changePayloadSortBy = (sortBy) => async (dispatch) => dispatch(changeFetchSortBy(sortBy))

export const changeLocationMaps = (newPosition, newLat, newLng) => {
    return async (dispatch) => {
        dispatch(changeLocationCenter(newPosition))
        dispatch(changeFetchRadius(500))
        dispatch(changeFetchLatitude(newLat))
        dispatch(changeFetchLongitude(newLng))
        dispatch(changeFetchTerm(''))
        dispatch(changeFetchCategory(''))
    }
}

export const resetSearchAndFilter = () => {
    return async (dispatch) => {
        dispatch(changeFetchRadius(40000))
        dispatch(changeFetchTerm(''))
        dispatch(changeFetchCategory(''))
        dispatch(changeFetchSortBy('best_match'))
        dispatch(changeFetchOffset(0))
        dispatch(changeFetchLatitude(0))
        dispatch(changeFetchLongitude(0))
    }
}

export default appSlice.reducer