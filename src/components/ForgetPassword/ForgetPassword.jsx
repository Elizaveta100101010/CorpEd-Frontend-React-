import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { codeWordSchema } from '../../utils/schemaUtil'
import { loginUser, CodewordPasswordUser, resetError } from '../../store/userSlice'
import styles from './ForgetPassword.module.scss'
import {
ADMIN_REGISTRATION_ROUTE,
USER_RULES_ROUTE,

} from '../../utils/routesUtil'

function ForgetPassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
 const { login, position, messagelogin, messageword, error } = useSelector((state) => state.user)
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    mode: 'onBlur',
  })

  useEffect(() => {
    login && navigate(position === "admin" ? ADMIN_REGISTRATION_ROUTE : USER_RULES_ROUTE);
  }, [login, position]);

  const onSubmit = (data) => {
   console.log(data, "нахуууууууууууй")
    dispatch(CodewordPasswordUser(data))
  }

  return (
    <div className={styles.authorization}>
      {error && message.error('Что-то пошло не так') && dispatch(resetError())}
      <h6 className={styles.authorization__header}>Смена пароля</h6>
      <Form
        name="normal_login"
        className={styles.athorization__form}
        initialValues={{ remember: true }}
        onFinish={handleSubmit(onSubmit)}
      >
                <Form.Item name="login">
          <label style={{marginBottom:"20px"}}>Логин:</label>
          <Controller
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Введите логин"
                prefix={<UserOutlined className="site-form-item-icon" />}
                className={`${styles['authorization__input']} ${
                  errors?.Login && styles['authorization__input--error']
                }`}
              />
            )}
            name="Login"
            control={control}
            defaultValue=""
            rules={{
              validate: (value) => {
                try {
                  codeWordSchema.pick({ Login: true }).parse({ Login: value })
                  return true
                } catch (err) {
                  return err.errors[0].message
                }
              },
            }}
          />
        </Form.Item>
        <div>{errors?.Login && <p style={{ color: '#f5222d', marginTop: '-20px' }}>{errors?.Login?.message}</p>} </div>
        <div>{messagelogin && <p style={{ color: '#f5222d' }}>{messagelogin}</p>} </div>
        <Form.Item name="codeword">
          <label style={{marginBottom:"20px"}}>Кличка вашего первого питомца:</label>
          <Controller
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Кодовое слово"
                prefix={<UserOutlined className="site-form-item-icon" />}
                className={`${styles['authorization__input']} ${
                  errors?.Codeword && styles['authorization__input--error']
                }`}
              />
            )}
            name="Codeword"
            control={control}
            defaultValue=""
            rules={{
              validate: (value) => {
                try {
                  codeWordSchema.pick({ Codeword: true }).parse({ Codeword: value })
                  return true
                } catch (err) {
                  return err.errors[0].message
                }
              },
            }}
          />
        </Form.Item>
        <div>{errors?.Codeword && <p style={{ color: '#f5222d', marginTop: '-20px' }}>{errors?.Codeword?.message}</p>} </div>
        <div>{messageword && <p style={{ color: '#f5222d' }}>{messageword}</p>} </div>
        <Form.Item name="Password">
        <label style={{marginBottom:"20px"}}>Новый пароль:</label>
          <Controller
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="Пароль"
                prefix={<LockOutlined className="site-form-item-icon" />}
                className={`${styles['authorization__input']} ${
                  errors?.Password && styles['authorization__input--error']
                }`}
                type="password"
              />
            )}
            name="Password"
            control={control}
            defaultValue=""
            rules={{
              validate: (value) => {
                try {
                  codeWordSchema.pick({ Password: true }).parse({ Password: value })
                  return true
                } catch (err) {
                  return err.errors[0].message
                }
              },
            }}
          />
        </Form.Item>
        <div>
          {' '}
          {errors?.Password && <p style={{ color: '#f5222d', marginTop: '-20px' }}>{errors?.Password?.message}</p>}{' '}
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.authorization__button}>
            Сменить пароль
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ForgetPassword
