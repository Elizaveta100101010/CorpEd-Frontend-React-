import React from 'react'
import logo from '../../assets/logo.png'
import icon from '../../assets/photo.png'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../../store/userSlice'
import { LOGIN_ROUTE } from '../../utils/routesUtil'
function Header() {

  const {  login, username, position } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  return (
    <div className={styles.header}>
          <img  src={logo} className={styles.header__logo}></img>
      {!login && (
          <div>
          <Link to={LOGIN_ROUTE} style={{ textDecoration: 'none' }}>
       <button className={styles.button__login}>Вход </button>
       </Link>
       </div>
)}
{
login && (
  <div>
              
  <img src={icon} className={styles.header__icon}></img>
  <label className={styles.header__profileName}> {username +":"} </label>
  <label className={styles.header__profileName}> {position} </label>
  <Link to={LOGIN_ROUTE} style={{ textDecoration: 'none' }}>
<button className={styles.button__login} onClick={() => dispatch(removeUser())}>Выход </button>
</Link>
</div>


)

}


    </div>
  )
}

export default Header
