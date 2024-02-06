import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const detailBusiness = createSlice({
    name: 'detailBusiness',
    initialState: {
        dataDetailBusiness: {},
        locationCenterDetailMap: {},
        isLoading: false,
        dataReviewBusiness: {},
        isLoadingReview: false,
    },
    reducers: {
        changeDataDetailBusiness: (state, action) => {
            state.dataDetailBusiness = action.payload
        },
        changeLocationCenterDetailMap: (state, action) => {
            state.locationCenterDetailMap = action.payload
        },
        changeIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        changeDataReviewBusiness: (state, action) => {
            state.dataReviewBusiness = action.payload
        },
        changeIsLoadingReview: (state, action) => {
            state.isLoadingReview = action.payload
        }
    }
})

export const {
    changeDataDetailBusiness,
    changeLocationCenterDetailMap,
    changeIsLoading,
    changeDataReviewBusiness,
    changeIsLoadingReview,
} = detailBusiness.actions

export function fetchDetailHome(alias) {
    return async (dispatch) => {
        try {
            dispatch(changeIsLoading(true))
            let { data } = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_BASE_URL}/businesses/${alias}`,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
                }
            })
            dispatch(changeDataDetailBusiness(data))
            dispatch(changeLocationCenterDetailMap({
                lat: data.coordinates.latitude,
                lng: data.coordinates.longitude,
            }))
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(changeIsLoading(false))
        }
    }
}

export function fetchReviewBusiness(alias) {
    return async (dispatch) => {
        try {
            dispatch(changeIsLoadingReview(true))
            let { data } = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_BASE_URL}/businesses/${alias}/reviews?offset=0&limit=3`,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
                }
            })
            dispatch(changeDataReviewBusiness(data))
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(changeIsLoadingReview(false))
        }
    }
}

export default detailBusiness.reducer