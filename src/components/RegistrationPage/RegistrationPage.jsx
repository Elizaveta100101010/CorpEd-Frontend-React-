import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input, Select, message } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { createUser, resetSuccess, resetError } from '../../store/userSlice'
import { signUpSchema } from '../../utils/schemaUtil'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import styles from './RegistrationPage.module.scss'
import { getPositions} from '../../store/positionsSlice'
import { getCourses} from '../../store/coursesSlice'
import { useInternalMessage } from 'antd/es/message/useMessage'


const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);


function RegistrationPage({ id, onUpdate }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {username, token, messagelogin, messagepassword, success, error} = useSelector((state) => state.user)
  const {dataU} = useSelector((state) => state.allUsers)
  const {datas, loading} = useSelector((state) => state.courses)

  useEffect(() => {
    dispatch(getPositions())
    dispatch(getCourses())
  }, [])

  const { positionss, loadingPositions } = useSelector((state) => state.positions)
  const {
    formState: { errors },
    handleSubmit,
    watch,
    control,
  } = useForm({
    mode: 'onBlur',
  })

  const currentUser = id && dataU 
    ? dataU.find((item) => item._id === id)
    : { login: '', password: '', position: '' }

  const onSubmit = (data) => {
    data.adminlogin = username
    data.token = token 
    console.log(data, "where")
    dispatch(onUpdate(data))
  }
  return (
    <div >
    {success && message.success('Новый работник зарегистрирован') && dispatch(resetSuccess())}
    {error && message.error('Что-то пошло не так') && dispatch(resetError())}
    { loadingPositions && loading ? <Spin indicator={antIcon} /> :
      <Form name="normal_login" className={styles.registration__form} onFinish={handleSubmit(onSubmit)}
  
      >
       <div> <label className={styles.registration__label}>Должность</label></div>
       <Controller
  render={({ field }) => (
    <Select
      {...field}
      placeholder="Выберите должность"
      style={{ width: 360, marginBottom: 15, borderRadius:10,    border: errors?.Position ? '1px solid red' : 'none' }}
      size="large"
    >
      {positionss && positionss.map((position) => (
        <option key={position.id} value={position.position}>
          {position.position}
        </option>
      ))}
    </Select>
  )}
  name="Position"
  defaultValue={currentUser.position}
  control={control}
  rules={{
    validate: (value) => {
      try {
        signUpSchema.pick({ Position: true }).parse({ Position: value })
        return true
      } catch (err) {
        return err.errors[0].message
      }
    },
  }}
/>
        <div>{/*usernameError && <p style={{ color: '#f5222d' }}>{usernameError}</p>*/} </div>
        <div>{errors?.Position && <p style={{ color: '#f5222d', marginTop:"-15px" }}>{errors?.Position?.message}</p>} </div>
        <label className={styles.registration__label}>Логин</label>
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Логин"
              className={`${styles['registration__input']} ${
                (errors?.Login || messagelogin) && styles['registration__input--error']
              }`}
            />
          )}
          name="Login"
          control={control}
          defaultValue={currentUser.login}
          rules={{
            validate: (value) => {
              try {
                signUpSchema.pick({ Login: true }).parse({ Login: value })
                return true
              } catch (err) {
                return err.errors[0].message
              }
            },
          }}
        />
        <div>{errors?.Login && <p style={{ color: '#f5222d' }}>{errors?.Login?.message}</p>} </div>
        <div>{messagelogin && <p style={{ color: '#f5222d' }}>{messagelogin}</p>} </div>

{!id && <div>
        <label className={styles.registration__label}>Пароль</label>
        <Controller
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder="Пароль"
              className={`${styles['registration__input']} ${errors?.Password && styles['registration__input--error']}`}
              type="password"
            />
          )}
          name="Password"
          control={control}
          defaultValue={currentUser.password}
          rules={{
            validate: (value) => {
              try {
                signUpSchema.pick({ Password: true }).parse({ Password: value })
                return true
              } catch (err) {
                return err.errors[0].message
              }
            },
          }}
        />
        <div>{errors?.Password && <p style={{ color: '#f5222d' }}>{errors?.Password?.message}</p>} </div>
        </div>
}
        <label className={styles.registration__label}>Пароль администратора</label>
        <Controller
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder="Пароль администратора"
              className={`${styles['registration__input']} ${(errors?.adminpassword || messagepassword ) && styles['registration__input--error']}`}
              type="password"
            />
          )}
          name="adminpassword"
          control={control}
          defaultValue=""
          rules={{
            validate: (value) => {
              try {
                signUpSchema.pick({ Password: true }).parse({ Password: value })
                return true
              } catch (err) {
                return err.errors[0].message
              }
            },
          }}
        />
        <div>{errors?.adminpassword && <p style={{ color: '#f5222d' }}>{errors?.adminpassword?.message}</p>} </div>
        <div>{messagepassword && <p style={{ color: '#f5222d' }}>{messagepassword}</p>} </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.registration__button}>
            {id? "Сохранить пользователя": "Создать пользователя"}
          </Button>
        </Form.Item>
      </Form>


}
</div>
  )
}

export default RegistrationPage

