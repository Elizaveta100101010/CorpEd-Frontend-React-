import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, Button, Input, Typography, Tag, Progress, Tabs, Form, Popconfirm, message } from 'antd';
import { useParams } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { createAppeal } from '../../store/appealsSlice';
import { deleteCourse, resetSuccess} from '../../store/coursesSlice'
import { getCourse} from '../../store/coursesSlice'
import { createCompleted} from '../../store/completedSlice'
import ReactMarkdown from 'react-markdown'
import { resetSuccessAppeal, resetError } from '../../store/appealsSlice'
import {
  ADMIN_COURSES_ROUTE,
  USER_COURSES_ROUTE
  } from '../../utils/routesUtil'

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);
const CoursePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (e) => setIsChecked(e.target.checked);
  const { slug } = useParams()
  const [progress, setProgress] = useState(0);
  const [quizVisible, setQuizVisible] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const { loading, data, success } = useSelector((state) => state.courses)
  const{username, token, position } = useSelector((state)=>state.user)
  const [activeTabKey, setActiveTabKey] = useState('1');
  const [userAnswers, setUserAnswers] = useState([]);
  const [allAnswersCorrect, setAllAnswersCorrect] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const currentCourse = data || null;
  const [sectionCompleted, setSectionCompleted] = useState(currentCourse ? Array(currentCourse.text.length).fill(false) : []);
  const onFinish = (values) => {
   
    values.course=currentCourse.title
    values.login= username
    values.token = token
    console.log(values)
    dispatch(createAppeal(values))
  };

  useEffect(() => {
    dispatch(getCourse(slug))
  }, [])

  useEffect(() => {
if (currentCourse) setSectionCompleted(Array(currentCourse.text.length).fill(false))
  }, [currentCourse])

console.log(sectionCompleted)
  const handleAnswerChange = (sectionIndex, questionIndex, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[sectionIndex] = newAnswers[sectionIndex] || []; // Создаем массив ответов для раздела, если он еще не существует
    newAnswers[sectionIndex][questionIndex] = value; // Обновляем ответ на вопрос
    setUserAnswers(newAnswers);
  };
  
  const handleCheckAnswers = (sectionIndex) => {
    const section = currentCourse.text[sectionIndex];
    const questions = section.questions;
    let allCorrect = true;
  
    questions.forEach((question, questionIndex) => {
      const correctAnswers = question.answers;
      const userAnswer = userAnswers[sectionIndex] && userAnswers[sectionIndex][questionIndex];
  
      if (correctAnswers != userAnswer) {
        allCorrect = false;
      }
    });
  
    setAllAnswersCorrect(allCorrect);
    if (allCorrect) scrollToTop()


    if (allCorrect) {
      setQuizVisible(false);
      setActiveTabKey(String(sectionIndex + 2));
  
      const newSectionCompleted = [...sectionCompleted];
      newSectionCompleted[sectionIndex] = true;
      setSectionCompleted(newSectionCompleted);
    } else {
      setQuizVisible(true);
    }

  };

  const handleButtonClick = () => {

      dispatch(createCompleted({course:currentCourse.title, login:username}))
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setTimeout(() => navigate(USER_COURSES_ROUTE), 3000);
      

  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // плавная прокрутка
    });
  };


  const handleTabChange = (key) => {
    setActiveTabKey(key);
  };
  
  const handleDeleteClick = () => {
    dispatch(deleteCourse({id: currentCourse._id, token}))
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div>
         {success && message.success('Статья удалена') && dispatch(resetSuccess())&& navigate(ADMIN_COURSES_ROUTE)}
        { loading || !currentCourse? <Spin indicator={antIcon} /> :
    <div style ={{backgroundColor:'white', padding:30, borderRadius:10, margin:30, width:938}}>
<div style={{ display: 'flex', flexDirection:"row", justifyContent:"space-between" }}>
  <Title level={2}>{currentCourse.title}</Title>
  {position ==="admin" &&  <div>

  <Link to={`/admin/change/course/${slug}`} style={{ textDecoration: 'none', color: 'black' }}>
  <Button  type="link" icon={<EditOutlined />}  />
          </Link>

  <Popconfirm
                placement="top"
                title={'Вы уверены что хотите удалить статью? '}
                description={'Удалить статью?'}
                onConfirm={() => handleDeleteClick()}
                okText="Да"
                cancelText="Нет"
              >
  <Button type="link" icon={<DeleteOutlined />} />
  </Popconfirm>
  </div>}
 
</div>
      <div style={{marginBottom: 20}}>
      {currentCourse.tags.map((tag, index) => (
          <Tag key={index} color={getRandomColor()}>{tag}</Tag>
        ))}
      </div>
      <Paragraph>
       {currentCourse.description}
      </Paragraph>
      <Tabs activeKey={activeTabKey}  onChange={handleTabChange}>
  {currentCourse.text.map((section, index) => (
    <TabPane tab={`Раздел ${index + 1}: ${section.name}`} key={index + 1}>
      <Paragraph><ReactMarkdown>{section.text}</ReactMarkdown></Paragraph>
      <div>
        <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
          Я закончил чтение статьи
        </Checkbox>
      </div>
      <div style={{ marginTop: '1em' }}>
        <Button type="primary" onClick={() => {
          if (isChecked) {
            setProgress(Math.round((index + 1) * 100/currentCourse.text.length));
            setQuizVisible(true);
          }
        }}>
          Продолжаем
        </Button>
      </div>

      {quizVisible && (
        <div style={{marginTop:'20px'}}>
          <Title level={3}>Тест</Title>
          <Paragraph>
            Поздравляю, вы закончили {section.name}! Пожалуйста ответьте на вопросы по разделу. 
          </Paragraph>
          <Paragraph>
            Введите номер правильного ответа, либо номера, через запятую:
          </Paragraph>
{section.questions.map((question, questionIndex) => (
  <div key={questionIndex}>
    <label style={{ marginBottom: 10 }}>
      <ReactMarkdown>{question.text}</ReactMarkdown>
    </label>
    <Input
      placeholder="Введите номер/а ответов"
      style={{ marginBottom: '1em' }}
      onChange={(e) => handleAnswerChange(index, questionIndex, e.target.value)}
    />
  </div>
))}
          <Button type="primary" onClick={(e) => handleCheckAnswers(index)}>
            Проверить
          </Button>
          {!allAnswersCorrect &&
            <Paragraph style={{color:'red', marginTop:20}}>Ваши ответы неправильные, пожалуйста перечитайте статью и попробуйте еще раз!</Paragraph>
          }
        </div>
      )}
    </TabPane>
  ))}
</Tabs>

<div style={{ marginTop: '2em' }}>
        <Title level={4}>Прогресс курса</Title>
        <Progress  percent={progress} />
      </div>
      <div style={{ marginTop: '2em' }}>
        <Title level={4}>У вас есть вопросы или пожелания по курсу?</Title>
        <Form onFinish={onFinish}>
        <Form.Item name="feedback" rules={[{ required: true, message: 'Пожалуйста, заполните это поле' }]}>
            <TextArea rows={4} onChange={(e) => setFeedback(e.target.value)} />
          </Form.Item>
          <Button 
           disabled={(position==="admin")}
          type="primary" htmlType="submit" >
            Отправить
          </Button>
        </Form>
      </div>
      <div style={{ marginTop: '2em' }}>
      <Button
  size="large"
  type="primary"
  onClick={handleButtonClick}
  disabled={!(sectionCompleted.every((completed) => completed))|| position==="admin"}
 style={{  fontSize:"18px"}}
>
Закончить курс
</Button>
        {showConfetti && (
      <Confetti
      width={window.innerWidth-20}
      height={window.innerHeight}
      recycle={false}
    />

)}
      </div>
    </div>
        }
    </div>
  );
};
export default CoursePage;
