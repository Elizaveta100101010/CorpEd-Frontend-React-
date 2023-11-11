import React, { useState, useEffect } from 'react';
import { Card, Collapse, message } from 'antd';
import { getQuestions, resetError } from '../../store/questionsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import styles from './QuestionList.module.scss'
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);
const { Panel } = Collapse;

const QuestionList = () => {
  const [activeKey, setActiveKey] = useState('');

  const handleCollapseChange = (key) => {
    setActiveKey(key);
  };
  const { data, loading, error } = useSelector((state) => state.questions)

  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(getQuestions())
  }, [])


  return (
    <div className={styles.form}>
      <h2>Часто задаваемые вопросы</h2>
      {error && message.error('Что-то пошло не так') && dispatch(resetError())}
    { loading   ? <Spin indicator={antIcon} /> :

      <Collapse activeKey={activeKey} onChange={handleCollapseChange} style={{ maxWidth: '800px', marginTop:'20px', backgroundColor: 'white', marginBottom:'20px' }}>
        {data.map((faq, index) => (
          <Panel header={<span style={{ fontSize: '24px' }}>{faq.question}</span>} key={index}>
            <Card style={{ fontSize: '20px' }}>{faq.answer}</Card>
          </Panel>
        ))}
      </Collapse> }
    </div>
  );
};


export default QuestionList;