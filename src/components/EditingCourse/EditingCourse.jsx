import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../store/userSlice'
import { useParams } from 'react-router-dom'
import RegistrationPage from '../RegistrationPage'
import { changeUser } from '../../store/userSlice'
import { changeCourse, resetSuccess, resetError } from '../../store/coursesSlice'
import CourseForm from '../CourseForm'
import { message } from 'antd';
import {
  ADMIN_COURSES_ROUTE
  } from '../../utils/routesUtil'
  import styles from './EditingCourse.module.scss'

function EditingCourse() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id} = useParams()
  const { success, error } = useSelector((state) => state.courses)

  const onUpdate = (courseData) => {
    console.log(courseData, "take a look")
    dispatch(changeCourse(courseData))
  }

  return (
    <div className={styles.form}>
      <h2 >Редактирование cтатьи </h2>
      {success && message.success('Курс изменен') && dispatch(resetSuccess())&& navigate(ADMIN_COURSES_ROUTE)}
      {error && message.error('Что-то пошло не так') && dispatch(resetError())}
      <CourseForm id ={id} onUpdate={onUpdate} />
    </div>
  )
}

export default EditingCourse