import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const detailBusiness = createSlice({
    name: 'detailBusiness',
    initialState: {
        dataDetailBusiness: {},
        isLoading: false,
    },
    reducers: {
        changeDataDetailBusiness: (state, action) => {
            state.dataDetailBusiness = action.payload
        },
        changeIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const {
    changeDataDetailBusiness,
    changeIsLoading,
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
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(changeIsLoading(false))
        }
    }
}

export default detailBusiness.reducer