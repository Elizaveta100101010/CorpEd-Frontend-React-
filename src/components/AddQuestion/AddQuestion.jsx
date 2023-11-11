import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './AddQuestion.module.scss'
import { createQuestion, resetSuccess, resetError } from '../../store/questionsSlice'
function ArticleForm({ slug, onUpdate }) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = (data) => {
   console.log(data)
   dispatch(createQuestion(data))
  }
  const {success, error} = useSelector((state) => state.questions)


  return (
    <Form
    className={styles.article}
      name="form_article"
      onFinish={onSubmit}
      onKeyPress={(e) => {
        e.key === 'Enter' && e.preventDefault()
      }}
    >
      {error && message.error('Что-то пошло не так') && dispatch(resetError())}
       {success && message.success('Ответ добавлен') && dispatch(resetSuccess())}
      <h2 style={{marginBottom:20}}>Добавить ответ в FAQ</h2>
      <h3 className={styles.article__label}>Вопрос</h3>
      <Form.Item name="question" rules={[{ required: true, message: 'Введите текст вопроса!' }]}>
        <Input className={styles.article__input}  style={{  fontSize: 18 }} type="Description" placeholder="Вопрос" maxLength={120} />
      </Form.Item>
      <h3 className={styles.article__label}>Ответ</h3>
      <Form.Item name="answer" rules={[{ required: true, message: 'Введите текст ответа!' }]}>
        <Input.TextArea
          className={styles.article__text}
          style={{  fontSize: 18 }}
          type="Text"
          placeholder="Ответ"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles.article__button}>
          Отправить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ArticleForm
