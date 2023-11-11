import { Progress, Space } from 'antd';
import { useRef, useState, useEffect } from 'react';
import CompletedCourses from '../CompletedCourses'
import { useSelector, useDispatch } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons';
import { getCompleted } from '../../store/completedSlice'
import { Spin } from 'antd';
import styles from './UserProgress.module.scss'

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

function UserProgress () {
  const dispatch = useDispatch()
const { username, currentcourses} = useSelector((state) => state.user)
const { data, loading} = useSelector((state) => state.completed)
useEffect(() => {
  dispatch(getCompleted())
}, [])

const filtered = (data) ? data.filter(obj => obj.login ==  username): data;

const uniqueCourses = filtered.reduce((unique, current) => {
  if (!unique.some(obj => obj.course === current.course)) {
    unique.push(current);
  }
  return unique;
}, []);
return(
  <div className={styles.form}>
      <h2>Ваш прогресс</h2>
  { loading ? <Spin indicator={antIcon} /> :
 <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center' }}>

      <Progress
        type="circle"
        percent={Math.round(uniqueCourses.length/currentcourses.length*100)}
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
      />
<CompletedCourses filtered={filtered}/>
</div>
}
</div>
)
      }
export default UserProgress;

