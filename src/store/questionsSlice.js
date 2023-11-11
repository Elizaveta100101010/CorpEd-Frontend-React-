import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {  requestQuestions, requestCreateQuestion } from '../services/questionsApiService'


export const createQuestion = createAsyncThunk(
  'user/createQuestion',
  async ({ question, answer }, { _, rejectWithValue }) => {
    try {
      const data = await requestCreateQuestion({ question, answer })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  }
)



export const getQuestions= createAsyncThunk('questions/getQuestions', async ( token,{ _, rejectWithValue }) => {
    try {
      const data = await requestQuestions({ token })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  })


const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
  data: null,
  loading:true,
  error: false,
  success: false,
  },
  reducers: {
    resetSuccess: (state) => {
      state.success = false
    },
    resetError: (state) => {
      state.error = false
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
      state.loading=true
      })
      .addCase(getQuestions.fulfilled, (state,action) => {
        state.data = action.payload
        state.loading=false
      })
      .addCase(getQuestions.rejected, (state, action) => {
        console.log('Error, error!!!', action)
        state.loading = false
        state.error = true
      })
        .addCase(createQuestion.fulfilled, (state,action) => {
          state.success=true
        })
        .addCase(createQuestion.rejected, (state, action) => {
          console.log('Error, error!!!', action)
          state.error = true
        })
  },
})

export const {  resetSuccess, resetError } = questionsSlice.actions
export default questionsSlice.reducer
