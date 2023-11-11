import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {  requestAppeals, requestCreateAppeal} from '../services/appealsApiService'

export const createAppeal = createAsyncThunk(
  'appeals/createAppeal',
  async ({ course, feedback, login, token}, { _, rejectWithValue }) => {
    try {
      const data = await requestCreateAppeal({ course, feedback, login, token })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  }
)


export const getAppeals= createAsyncThunk('appeals/getAppeals', async ( token,{ _, rejectWithValue }) => {
    try {
      const data = await requestAppeals({ token })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  })


const appealsSlice = createSlice({
  name: 'appeals',
  initialState: {
  data: null,
  loading:true,
  error:false,
  successAppeal:false,
  },
  reducers: {
    resetSuccessAppeal: (state) => {
      state.successAppeal = false
    },
    resetError: (state) => {
      state.error = false
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAppeals.pending, (state) => {
      state.loading=true
      })
      .addCase(getAppeals.fulfilled, (state,action) => {
        state.data = action.payload
        state.loading=false
        state.successAppeal = true
      })
      .addCase(getAppeals.rejected, (state, action) => {
        console.log('Error, error!!!', action)
        state.loading = false
        state.error = true
      })
      .addCase(createAppeal.pending, (state) => {

        })
        .addCase(createAppeal.fulfilled, (state,action) => {
  console.log("good")
        })
        .addCase(createAppeal.rejected, (state, action) => {
          console.log('Error, error!!!', action)
          state.error = true
        })
  },
})

export const {  resetError, resetSuccessAppeal } = appealsSlice.actions
export default appealsSlice.reducer
