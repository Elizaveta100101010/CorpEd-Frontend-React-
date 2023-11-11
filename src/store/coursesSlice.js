import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {  requestCourses, requestCreateCourse, requestDeleteCourse, requestChangeCourse, requestGetCourse} from '../services/coursesApiService'


export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async ({ title, description, position, tags, url, text, token }, { _, rejectWithValue }) => {
    try {
      const data = await requestCreateCourse({ title, description, position, tags, url, text, token })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  }
)





export const changeCourse= createAsyncThunk(
  'courses/changeCourse',
  async ({id,title, description, tags, url, text, token }, { _, rejectWithValue }) => {
    try {
      const data = await requestChangeCourse({ id,title, description, tags, url, text, token  })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  }
)



export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async ({id, token}, { _, rejectWithValue }) => {
    try {
      const data = await requestDeleteCourse({ id,token })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  }
)


export const getCourses= createAsyncThunk('courses/getCourses', async (token, { _, rejectWithValue }) => {
    try {
      const data = await requestCourses({ token })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  })

  export const getCourse= createAsyncThunk('courses/getCourse', async (id, { _, rejectWithValue }) => {
    try {
      const data = await requestGetCourse({ id })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  })



const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
  datas: null,
  data: null,
  loading:true,
  error:false,
  success:false,
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
      .addCase(getCourses.pending, (state) => {
      state.loading=true
      })
      .addCase(getCourses.fulfilled, (state,action) => {
        state.datas = action.payload
        state.error = false
        state.loading=false
      })
      .addCase(getCourses.rejected, (state, action) => {
        console.log('Error, error!!!', action)
        state.loading = false
        state.error = true
      })
      .addCase(createCourse.pending, (state) => {
        state.loading=true
        state.success=false
        })
        .addCase(createCourse.fulfilled, (state,action) => {
          console.log("succesfull")
          state.error = false
          state.loading=false
          state.success=true
        })
        .addCase(createCourse.rejected, (state, action) => {
          console.log('Error, course not created!!!', action)
          state.loading = false
          state.error = true
        })
        .addCase(deleteCourse.fulfilled, (state,action) => {
          console.log("succesfull deletion course")
          state.success=true
        })
        .addCase(deleteCourse.rejected, (state, action) => {
          console.log('Error, course not created!!!', action)
          state.error = true
        })
        .addCase(changeCourse.fulfilled, (state,action) => {
          console.log("succesfull change course")
          state.success=true

        })
        .addCase(changeCourse.rejected, (state, action) => {
          console.log('Error, change not created!!!', action)
          state.error = true
        })
        .addCase(getCourse.pending, (state,action) => {

          state.loading=true

        })
        .addCase(getCourse.fulfilled, (state,action) => {
          console.log("succesfull get course", action.payload)
          state.data = action.payload
          state.loading=false

        })
        .addCase(getCourse.rejected, (state, action) => {
          console.log('Error, get course not created!!!', action)
          state.error = true
        })
  },
})

export const {  resetSuccess, resetError } = coursesSlice.actions
export default coursesSlice.reducer
