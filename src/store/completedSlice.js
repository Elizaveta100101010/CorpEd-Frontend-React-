import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {  requestCompleted, requestCreateCompleted} from '../services/completedApiService'

export const createCompleted = createAsyncThunk(
  'completed/createCompleted',
  async ({ login, course}, { _, rejectWithValue }) => {
    try {
      const data = await requestCreateCompleted({ login, course })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  }
)

export const getCompleted= createAsyncThunk('completed/getCompleted', async ( token,{ _, rejectWithValue }) => {
    try {
      const data = await requestCompleted({ token })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  })


const completedSlice = createSlice({
  name: 'completed',
  initialState: {
  data: null,
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
      .addCase(getCompleted.pending, (state) => {
      state.loading=true
      })
      .addCase(getCompleted.fulfilled, (state,action) => {
        state.data = action.payload.reverse()
        state.loading=false
        console.log(action)
      })
      .addCase(getCompleted.rejected, (state, action) => {
        console.log('Error, error!!!', action)
        state.loading = false
        state.error = true
      })
      .addCase(createCompleted.pending, (state) => {

        })
        .addCase(createCompleted.fulfilled, (state,action) => {
       console.log("good")
        })
        .addCase(createCompleted.rejected, (state, action) => {
          console.log('Error, error!!!', action)
          state.error = true
        })
  },
})

export const {  resetError } = completedSlice.actions
export default completedSlice.reducer
