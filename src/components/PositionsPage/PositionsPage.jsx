import { Select, Button, Form, Input, message } from 'antd';
import React, { useState,useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import styles from './PositionsPage.module.scss'
import { getPositions, createPosition, resetSuccess, changePosition, resetError} from '../../store/positionsSlice'
import { getCourses } from '../../store/coursesSlice'
import { LoadingOutlined } from '@ant-design/icons';
import { getallUsers} from '../../store/allUsersSlice'
import { Spin } from 'antd';
const { Option } = Select;


const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const PositionsPage = () => {
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectingCourses, setSelectingCourses] = useState([]);

  const { positionss, loadingPositions, successAdd, successPosition, error } = useSelector((state) => state.positions)
  const { datas, loading } = useSelector((state) => state.courses)
  const { token } = useSelector((state) => state.user)


  const titlesArray = !loading ? datas.map(obj => obj.title): null

console.log(positionss, loadingPositions)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPositions())
    dispatch(getCourses())
  }, [])


  const onSubmit = (data) => {
 
    data.token=token
    console.log(data)
    dispatch(createPosition(data))
      }

  const handlePositionChange = (value) => {
    setSelectedPosition(value);
    const position = positionss.find((pos) => pos.position === value);
    setSelectedCourses(position ? position.courses : []);
  };

  const handleCoursesChange = (value) => {
    setSelectedCourses(value);
  };

  const handleCoursesChanging = (value) => {
    setSelectingCourses(value);
  };


  const handleButtonClick = () => {
    const data = {}
    data.position = selectedPosition
    data.courses = selectedCourses
    data.token=token
   console.log(data)
   dispatch(changePosition(data))
   
  };

  return (
    <div>
         {error && message.error('Что-то пошло не так') && dispatch(resetError())}
         {successPosition && message.success('Позиция изменена') && dispatch(resetSuccess())}
         {successAdd && message.success('Позиция добавлена') && dispatch(resetSuccess())}
    { loading ? <Spin indicator={antIcon} /> :
     <div>

    <div  className={styles.article} >
    <h2 style={{ textAlign: 'center', marginTop:-20,marginBottom:20 }}>Редактирование должностей</h2>
    <div style={{display:"inline-flex",     justifyContent:"space-evenly"}}>
      <div style={{ flexDirection: 'column'}}>
      <h3 className={styles.article__label}>Выберите должность</h3>
      <div style={{ marginBottom: 16 }}>
        <Select
          value={selectedPosition}
          onChange={handlePositionChange}
          placeholder="Выберите позицию"
          style={{ width: 300, fontSize: 18 }}
          size="large"
        >
          {positionss.map((positions) => (
            <Option key={positions.position} value={positions.position}>
              {positions.position}
            </Option>
          ))}
        </Select>
      </div>
      <h3 className={styles.article__label}>Выберите курсы</h3>
      <div style={{ marginBottom: 16 }}>
        <Select
          mode="multiple"
          value={selectedCourses}
          onChange={handleCoursesChange}
          placeholder=""
          style={{ width: 300, fontSize: 18 }}
          size="large"
        >
           { titlesArray.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
</Select>
      </div>
      <div>
        <Button type="primary" onClick={handleButtonClick} className={styles.article__button}>
          Сохранить
        </Button>
      </div>
      </div>
      <Form

      name="form_article"
      onFinish={onSubmit}
      onKeyPress={(e) => {
        e.key === 'Enter' && e.preventDefault()
      }}
    >
      <h3 className={styles.article__label}>Добавить должность</h3>
      <Form.Item name="position" rules={[{ required: true, message: 'Введите текст вопроса!' }]} style={{marginBottom:0}}>
        <Input className={styles.article__input} type="Description" placeholder="Должность" maxLength={120} />
      </Form.Item>
      <h3 style={{marginTop:16}}>Добавить курсы</h3>
      <Form.Item name="courses" rules={[{ required: true, message: 'Введите текст ответа!' }]} style={{marginBottom:0}}>
      <Select
          mode="multiple"
          onChange={handleCoursesChanging}
          placeholder="Выберите курсы"
          style={{ width: 300, fontSize: 18 }}
          size="large"
          options={titlesArray.map((course) => ({ value: course, label: course }))}
        />
      </Form.Item>
      <Form.Item  style={{marginTop:16}}>
        <Button type="primary" htmlType="submit" className={styles.article__button}>
          Создать
        </Button>
      </Form.Item>
    </Form>
    </div>
    </div>
    </div>}
    </div>
  );
};

export default PositionsPage;