import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { requestLoginUser, requestCreateUser,
   requestCurrentUser, requestCurrentCourses,
    requestnewPasswordUser, requestDeleteUser, 
    requestChangeUser, requestaddCompleteUser,
  requestCodewordPasswordUser,
requestCodewordUser} from '../services/userApiService'
import { setCookie, getCookie } from '../utils/cookieUtil'



export const CodewordPasswordUser= createAsyncThunk(
  'user/codewordPasswordUser',
  async ({ login, codeword, Password  }, { _, rejectWithValue }) => {
    try {
      const data = await requestCodewordPasswordUser({ login, codeword, Password })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  }
)



export const CodewordUser= createAsyncThunk(
  'user/codewordUser',
  async ({ id, codeword }, { _, rejectWithValue }) => {
    console.log(codeword, "да емае")
    try {
      const data = await requestCodewordUser({ id, codeword })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  }
)



export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ Position, Login, Password, adminlogin, adminpassword, token }, { _, rejectWithValue }) => {
    try {
      const data = await requestCreateUser({ Position, Login, Password, adminlogin, adminpassword, token })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  }
)


export const changeUser = createAsyncThunk(
  'user/changeUser',

  async ({id, Login, Password,Position, adminlogin, adminpassword, token}, { _, rejectWithValue }) => {
    try {
      const data = await requestChangeUser({ id, Login, Password, Position, adminlogin, adminpassword, token })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  }
)


export const addCompleteUser = createAsyncThunk(
  'user/addCompleteUser',
  async ({id, title, token}, { _, rejectWithValue }) => {
    try {
      const data = await requestaddCompleteUser({ id, title, token })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  }
)


export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async ({id, token}, { _, rejectWithValue }) => {
    try {
      const data = await requestDeleteUser({ id,token })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  }
)



export const newPasswordUser = createAsyncThunk(
  'user/newPasswordUser',
  async ({ login, password, newpassword, token }, { _, rejectWithValue }) => {
    try {
      const data = await requestnewPasswordUser({ login, password, newpassword, token })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  }
)


export const loginUser = createAsyncThunk(
  'user/loginUser',

  async ({ Login, Password }, { _, rejectWithValue }) => {
    try {
      const data = await requestLoginUser({ Login, Password })
      return data
    } catch (error) {
      return rejectWithValue(error.status)
    }
  }
)

export const currentUser = createAsyncThunk('user/currentUser', async (token, { _, rejectWithValue }) => {
  try {
    const data = await requestCurrentUser({ token })
    return data
  } catch (error) {
    return rejectWithValue(error.status)
  }
})

export const currentCourses = createAsyncThunk('user/currentCourses', async (position, { _, rejectWithValue }) => {
  try {
    const data = await requestCurrentCourses({ position })
    return data
  } catch (error) {
    return rejectWithValue(error.status)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id:null,
    username: null,
    token: null,
    position: null,
    login: false,
    currentcourses:null,
    courses: null,
    codeword:null,
    loading: true,
    messagelogin:null,
    messagepassword:null,
    messagepasswordreset:null,
    messageword:null,
    success:false,
    error:false,
    updates:false,
  },
  reducers: {
    removeUser: (state) => {
      state.username = null
      state.token = null
      state.position = null
      state.login = false 
      state.id = null
      state.codeword = null
      state.currentcourses = null
     setCookie('token_coursed', state.token, -1)
    },
    resetProfileLoading: (state) => {
      state.profileLoading = false
    },
    resetSuccess: (state) => {
      state.success = false
    },
    resetError: (state) => {
      state.error = false
    },
    incrementUpdate: (state) => {
      state.updates = true
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(createUser.fulfilled, (state,action) => {
        console.log(action)
        state.success=true
        state.messagelogin = false
        state.messagepassword = false
      })
      .addCase(createUser.rejected, (state, action) => {
       state.messagelogin = action.payload.user
       state.messagepassword = action.payload.password
      })
      .addCase(currentCourses.pending, (state) => {
        state.loading = true
      })
      .addCase(currentCourses.fulfilled, (state,action) => {
        console.log(action, "COURSES")
        state.loading = false
        state.currentcourses=action.payload
      })
      .addCase(currentCourses.rejected, (state, action) => {
        console.log('COURSES created, error!!!', action)
        state.loading = true
      })
      .addCase(loginUser.pending, (state) => {
        state.login = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.username = action.payload.userData.login
        state.id = action.payload.userData._id
        state.token = action.payload.token
        state.position = action.payload.userData.position
        state.codeword = action.payload.userData.codeword
        state.login = true 
        state.messagelogin = null
        setCookie('token_coursed', state.token, 12)
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action)
        state.messagelogin = action.payload.message
        state.error = true
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        console.log(action, "remember")
        console.log(action, 'USERCOURSES')
        state.username = action.payload.userData.login
        state.token = getCookie('token_coursed')
        state.position = action.payload.userData.position
        state.codeword = action.payload.userData.codeword
        state.id = action.payload.userData._id
        state.login = true
      })
      .addCase(currentUser.rejected, (state, action) => {
        console.log('User not created, error!!!', action.payload)
      })
      .addCase(newPasswordUser.fulfilled, (state, action) => {
        console.log(action, "remember")
        state.messagepasswordreset = null
        state.success = true
      })
      .addCase(newPasswordUser.rejected, (state, action) => {
        state.messagepasswordreset = action.payload.password
        state.error = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        console.log(action, "delete user success")
        state.success=true

      })
      .addCase(deleteUser.rejected, (state, action) => {
        console.log('delete user, error!!!', action.payload)
        state.error = true
      })
      .addCase(changeUser.fulfilled, (state, action) => {
        console.log(action, "change user success")
        state.success=true

      })
      .addCase(changeUser.rejected, (state, action) => {
        console.log('change user, error!!!', action.payload)
        state.error = true
      })
      .addCase(addCompleteUser.fulfilled, (state, action) => {
        console.log(action, "complete user success")

      })
      .addCase(addCompleteUser.rejected, (state, action) => {
        console.log('complete user, error!!!', action.payload)
        state.error = true
      })
      .addCase(CodewordPasswordUser.fulfilled, (state, action) => {
        console.log(action, "парольчик поменяли")
        state.messagelogin = null
        state.messageword = null

      })
      .addCase(CodewordPasswordUser.rejected, (state, action) => {
        state.messagelogin = action.payload.login
        state.messageword = action.payload.word
        console.log('не поменяли !!!', action.payload)
        state.error = true
      })
      .addCase(CodewordUser.fulfilled, (state, action) => {
        console.log(action, "слово создано")
        state.success=true

      })
      .addCase(CodewordUser.rejected, (state, action) => {
        console.log('слово не создано!!!', action.payload)
        state.error = true
      })
  },
})

export const { setUser, removeUser, resetProfileLoading, resetSuccess, resetError, incrementUpdate} = userSlice.actions
export default userSlice.reducer
