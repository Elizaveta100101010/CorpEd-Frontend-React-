import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {  requestPositions, requestCreatePosition, requestChangePosition} from '../services/positionsApiService'

export const createPosition = createAsyncThunk(
  'positions/createPosition',
  async ({ position, courses, token}, { _, rejectWithValue }) => {
    try {
      const data = await requestCreatePosition({ position, courses, token })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  }
)

export const changePosition = createAsyncThunk(
  'positions/changePosition',
  async ({ position, courses, token}, { _, rejectWithValue }) => {
    try {
      const data = await requestChangePosition({ position, courses, token })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  }
)

export const getPositions= createAsyncThunk('positions/getPositions', async ( token,{ _, rejectWithValue }) => {
    try {
      const data = await requestPositions({ token })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  })


const positionsSlice = createSlice({
  name: 'positions',
  initialState: {
  positionss: null,
  loadingPositions:true,
  successPosition: false,
  successAdd: false,
  error:false,
  },
  reducers: {
    resetSuccess: (state) => {
      state.successPosition = false
      state.successAdd = false
    },
    resetError: (state) => {
      state.error = false
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPositions.pending, (state) => {
      state.loadingPositions=true
      })
      .addCase(getPositions.fulfilled, (state,action) => {
        state.positionss = action.payload
        state.loadingPositions = false
        console.log(state.positionss, "CHECK")
      })
      .addCase(getPositions.rejected, (state, action) => {
        console.log('Error, error!!!', action)
        state.loadingPositions = false
        state.error = true
      })
      .addCase(createPosition.pending, (state) => {

        })
        .addCase(createPosition.fulfilled, (state,action) => {
  console.log("good")
  state.successAdd=true
        })
        .addCase(createPosition.rejected, (state, action) => {
          console.log('Error, error!!!', action)
          state.error = true
        })
        .addCase(changePosition.fulfilled, (state,action) => {
  console.log("good")
  state.successPosition=true
        })
        .addCase(changePosition.rejected, (state, action) => {
          console.log('Error, error!!!', action)
          state.error = true
        })
  },
})

export const {  resetSuccess,resetError } = positionsSlice.actions
export default positionsSlice.reducer
