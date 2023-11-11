import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { signInSchema } from '../../utils/schemaUtil'
import { loginUser, resetError } from '../../store/userSlice'
import styles from './LoginPage.module.scss'
import {
ADMIN_REGISTRATION_ROUTE,
USER_RULES_ROUTE,
PASSWORD_ROUTE

} from '../../utils/routesUtil'

function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
 const { login, position, messagelogin, error } = useSelector((state) => state.user)
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
    console.log(data)
    dispatch(loginUser(data))
  }

  return (
    <div className={styles.authorization}>
      {error && message.error('Что-то пошло не так') && dispatch(resetError())}
      <h6 className={styles.authorization__header}>Вход </h6>
      <Form
        name="normal_login"
        className={styles.athorization__form}
        initialValues={{ remember: true }}
        onFinish={handleSubmit(onSubmit)}
      >
        <Form.Item name="username">
          <Controller
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Логин"
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
                  signInSchema.pick({ Login: true }).parse({ Login: value })
                  return true
                } catch (err) {
                  return err.errors[0].message
                }
              },
            }}
          />
        </Form.Item>
        <div>{errors?.Login && <p style={{ color: '#f5222d', marginTop: '-20px' }}>{errors?.Login?.message}</p>} </div>
        <Form.Item name="Password">
          <Controller
            render={({ field }) => (
              <Input
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
                  signInSchema.pick({ Password: true }).parse({ Password: value })
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

      
        <Form.Item style={{marginTop:"-20px", marginBottom:"10px"}}>
      <Link style={{textDecoration:'none'}}to={PASSWORD_ROUTE}>Забыли пароль?</Link>
        </Form.Item>
        <div>{messagelogin && <p style={{ color: '#f5222d' }}>{messagelogin}</p>} </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.authorization__button}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginPage
