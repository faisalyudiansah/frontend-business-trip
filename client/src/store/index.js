import { configureStore } from '@reduxjs/toolkit'
import appSlice from './appSlice'
import detailBusinessSlice from './detailBusinessSlice'

const store = configureStore({
    reducer: { appSlice, detailBusinessSlice }
})

export default store