import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../store/userSlice'
import { useParams } from 'react-router-dom'
import RegistrationPage from '../RegistrationPage'
import { changeUser, resetSuccess,resetError } from '../../store/userSlice'
import {  message } from 'antd';
import styles from './EditingUser.module.scss'

import {
  ADMIN_USERS_ROUTE
  } from '../../utils/routesUtil'

function EditingUser() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id} = useParams()
  const {  success, error } = useSelector((state) => state.user)

  const onUpdate = (data) => {
    console.log(data, "liza")
    data.id=id
    dispatch(changeUser(data))
  }

  return (
    <div className={styles.form}>
            {success && message.success('Пользователь изменен') && dispatch(resetSuccess()) && navigate(ADMIN_USERS_ROUTE)}
            {error && message.error('Что-то пошло не так') && dispatch(resetError())}
      <h2 className={styles.article__header}>Редактирование работника </h2>
      <RegistrationPage id ={id} onUpdate={onUpdate} />
    </div>
  )
}

export default EditingUser