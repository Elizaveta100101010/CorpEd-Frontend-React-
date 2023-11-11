import React from 'react'
import styles from './MainPage.module.scss'
import image from '../../assets/illustration.png'
import { Link } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../utils/routesUtil'
function MainPage() {
  return (

    <div className={styles.main}>
   <div className={styles.main__block}>
      <img  src={image} className={styles.main__icon}></img>
      <div>
      <h1 className={styles.main__header}>Корпоративные правила - тысяча мелочей, но мы поможем их освоить!</h1>
          <p className={styles.main__text}>Мы предлагаем сотрудникам компаний эффективный и удобный способ овладеть корпоративными правилами и политиками. 
            Наш онлайн-курс разработан с учетом современных требований к обучению – он включает в себя примеры интерактивных 
            заданий, тестирования и обратную связь.
           <p  className={styles.main__text}>Не проходите мимо возможности сделать свою работу продуктивнее и безопаснее. Присоединяйтесь к <span style={{color:"#1f57aa", fontWeight:"bold"}}>CorpEd</span> уже сегодня 
            и начните освоение корпоративных правил, не отрываясь от работы!</p> 
      </p>
      <Link to={LOGIN_ROUTE} style={{ textDecoration: 'none' }}>
      <button className={styles.button__more}>Приступить</button>
      </Link>
   </div>
   </div>
   <div>
   </div>
    </div>

  )
}

export default MainPage