import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import {adminPanel, userPanel} from '../../utils/interfacesUtil'
import RegistrationPage from '../RegistrationPage'
import Header from '../Header'
import MainPage from '../MainPage'
import LoginPage from '../LoginPage'
import CourseList from '../CourseList'
import QuestionList from '../QuestionList'
import CoursePage from '../CoursePage'
import CompletedCourses from '../CompletedCourses'
import AddQuestion from '../AddQuestion'
import SideBar from '../SideBar'
import PositionsPage from '../PositionsPage'
import TableUsers from '../TableUsers'
import ResetPassword from '../ResetPassword'
import CreateCourse from '../CreateCourse'
import UsersQuestions from '../UsersQuestions'
import EditingCourse from '../EditingCourse'
import UserProgress from '../UserProgress'
import StartPage from '../StartPage'
import EditingUser from '../EditingUser'
import ForgetPassword from '../ForgetPassword'
import RegistrationUser from '../RegistrationUser'
import { getCookie } from '../../utils/cookieUtil'
import { currentUser, currentCourses} from '../../store/userSlice'
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './App.module.scss'
import {
  HOME_ROUTE,
  ERROR_ROUTE,
  LOGIN_ROUTE,
  ADMINPAGE_ROUTE,
  ADMIN_REGISTRATION_ROUTE,
ADMIN_COURSES_ROUTE,
ADMIN_USERS_ROUTE,
ADMIN_FINISHED_ROUTE,
ADMIN_SUGGESTIONS_ROUTE,
ADMIN_QUESTION_ROUTE,
ADMIN_EDIT_ROUTE,
ADMIN_CREATE_ROUTE,
ADMIN_POSITIONS_ROUTE,
USER_RULES_ROUTE,
USER_COURSES_ROUTE,
USER_PROGRESS_ROUTE,
USER_FAQ_ROUTE,
USER_PASSWORD_ROUTE,
COURSE_ROUTE,
ADMIN_CHANGE_USER,
ADMIN_CHANGE_COURSE,
PASSWORD_ROUTE
} from '../../utils/routesUtil'
import {PrivateRoutes, PrivateAdminRoutes} from '../../utils/privateRoutes'

function App() {


  const dispatch = useDispatch()
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    setToken(getCookie('token_coursed'));
  }, []);

  const {position } = useSelector((state) => state.user)

  useEffect(() => {
    token && (dispatch(currentUser(token)))
  }, [token])

  

  useEffect(() => {
    position &&  (dispatch(currentCourses(position)))
  }, [position])

  return (
    <div>

      <Header/>

      <div style={{ display: 'flex', justifyContent:'center' }}>
        <div style={{position:'absolute', left:0}}>
        {position === 'admin' ? <SideBar routes={adminPanel}/> : (position && <SideBar routes={userPanel}/>)}
         </div>
         <div
        style={{
          marginLeft: 300,
          justifyContent: 'center',
        }}>

    <Routes>
      <Route path={HOME_ROUTE} element={!token ? <MainPage />  : <StartPage />} />
      <Route path={ERROR_ROUTE} element={<MainPage />} />
      <Route path={LOGIN_ROUTE} element={<LoginPage />} />
      <Route path={PASSWORD_ROUTE} element={<ForgetPassword/>} />
      <Route element={<PrivateRoutes />}>
      <Route element={<PrivateAdminRoutes />}>
      <Route path={ADMIN_CHANGE_USER} element={<EditingUser />} />
      <Route path={ADMIN_CHANGE_COURSE} element={<EditingCourse/>} />
      <Route path={ADMIN_REGISTRATION_ROUTE} element={ <RegistrationUser />} />
      <Route path={ADMIN_COURSES_ROUTE} element={<CourseList />} />
      <Route path={ADMIN_USERS_ROUTE} element={ <TableUsers />} />
      <Route path={ADMIN_FINISHED_ROUTE} element={<CompletedCourses /> } />
      <Route path={ADMIN_SUGGESTIONS_ROUTE} element={ <UsersQuestions/>} />
      <Route path={ADMIN_QUESTION_ROUTE} element={ <AddQuestion />} />
      <Route path={ADMIN_EDIT_ROUTE} element={<ResetPassword />} />
      <Route path={ADMIN_CREATE_ROUTE} element={<CreateCourse />} />
      <Route path={ADMIN_POSITIONS_ROUTE} element={<PositionsPage />} />
      </Route>
      <Route path={COURSE_ROUTE} element={<CoursePage />} />
      <Route path={USER_RULES_ROUTE} element={<StartPage />} />
      <Route path={USER_COURSES_ROUTE} element={ <CourseList />} />
      <Route path={USER_PROGRESS_ROUTE} element={<UserProgress/> } />
      <Route path={USER_FAQ_ROUTE} element={ <QuestionList />} />
      <Route path={USER_PASSWORD_ROUTE} element={<ResetPassword />} />
      </Route>
    </Routes>
  </div>
</div>

    </div>
  )
}

export default App
