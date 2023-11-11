import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../store/userSlice'
import styles from './RegistrationUser.module.scss'
import RegistrationPage from '../RegistrationPage'

function RegistrationUser() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onUpdate = (data) => {
    console.log(data)
    dispatch(createUser(data))
  }

  return (
    <div className={styles.form}>
      <h2 style={{marginBottom:20}}>Регистрация  работника </h2>
      <RegistrationPage onUpdate={onUpdate} />
    </div>
  )
}

export default RegistrationUser