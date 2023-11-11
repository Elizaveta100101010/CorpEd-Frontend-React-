import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userSlice'
import questionReducer from './questionsSlice'
import coursesReducer from './coursesSlice'
import appealsReducer from './appealsSlice'
import completedReducer from './completedSlice'
import allUsersReducer from './allUsersSlice'
import positionsReducer from './positionsSlice'
export default configureStore({
  reducer: {
    user: userReducer,
    questions: questionReducer,
    courses: coursesReducer,
    appeal: appealsReducer,
    completed: completedReducer,
    allUsers: allUsersReducer,
    positions: positionsReducer,
  },
})
