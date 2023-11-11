import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {  requestallUsers} from '../services/allUsersApiService'



export const getallUsers= createAsyncThunk('allUsers/getallUsers', async ( token,{ _, rejectWithValue }) => {
    try {
      const data = await requestallUsers({ token })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  })


const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: {
  dataU: null,
  loading:true,
  error:false,
  },
  reducers: {
    resetError: (state) => {
      state.error = false
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getallUsers.pending, (state) => {
      state.loading=true
      })
      .addCase(getallUsers.fulfilled, (state,action) => {
        state.dataU = action.payload
        state.loading=false
        console.log(action, "all users")
      })
      .addCase(getallUsers.rejected, (state, action) => {
        console.log('Error, error!!!', action)
        state.loading = false
        state.error = true
      })
  },
})

export const {  resetError } = allUsersSlice.actions
export default allUsersSlice.reducer
