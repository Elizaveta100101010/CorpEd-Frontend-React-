import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../store/userSlice'
import { useParams } from 'react-router-dom'
import RegistrationPage from '../RegistrationPage'
import { changeUser } from '../../store/userSlice'
import { createCourse, resetSuccess, resetError } from '../../store/coursesSlice'
import CourseForm from '../CourseForm'
import { message } from 'antd';
import {
  ADMIN_COURSES_ROUTE
  } from '../../utils/routesUtil'
  import styles from './CreateCourse.module.scss'


function CreateCourse() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { success, error } = useSelector((state) => state.courses)
  const onUpdate = (courseData) => {
    dispatch(createCourse(courseData))
  }

  return (
    <div className={styles.form} >
      {error && message.error('Что-то пошло не так') && dispatch(resetError())}
         {success && message.success('Курс создан') && dispatch(resetSuccess())&& navigate(ADMIN_COURSES_ROUTE)}
      <h2 style={{marginBottom:0}}>Создание курса </h2>
      <CourseForm  onUpdate={onUpdate} />
    </div>
  )
}

export default CreateCourse