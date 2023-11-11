import { Input, Button, Form, message } from 'antd';
import { resetPasswordSchema } from '../../utils/schemaUtil'
import styles from './ResetPassword.module.scss'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { newPasswordUser, resetSuccess,resetError } from '../../store/userSlice'

function ResetPassword() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
 const {username, token, messagepasswordreset, success, error} = useSelector((state) => state.user)


 const onSubmit = (data) => {
  data.login=username
  data.token=token
  console.log(data, 'newpassword')
  dispatch(newPasswordUser(data))
}

const {
  formState: { errors },
  handleSubmit,
  control,
} = useForm({
  mode: 'onBlur',
})


  return (
    <div className={styles.form}>
       {success && message.success('Пароль изменен') && dispatch(resetSuccess())}
       {error && message.error('Что-то пошло не так') && dispatch(resetError())}
      <h2 style={{marginBottom:30}}> Смена пароля</h2>

  <Form
  name="normal_password"

  initialValues={{ remember: true }}
  onFinish={handleSubmit(onSubmit)}
>
<Form.Item name="Password">
    <Controller
      render={({ field }) => (
        <Input.Password
          {...field}
          placeholder="Старый пароль"
          style={{ width: 300, fontSize: 18 }}
          className={`${styles['form__input']} ${
            errors?.Password && styles['form__input--error']
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
            resetPasswordSchema.pick({ Password: true }).parse({ Password: value })
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
    <div>{messagepasswordreset&& <p style={{ color: '#f5222d' }}>{messagepasswordreset}</p>} </div>
  </div>
  <Form.Item name="newpassword">

  <Controller
      render={({ field }) => (
        <Input.Password
          {...field}
          placeholder="Новый пароль"
          style={{ width: 300, fontSize: 18 }}
          className={`${styles['form__input']} ${
            errors?.Password && styles['form__input--error']
          }`}
          type="password"
        />
      )}
      name="NewPassword"
      control={control}
      defaultValue=""
      rules={{
        validate: (value) => {
          try {
            resetPasswordSchema.pick({ NewPassword: true }).parse({ NewPassword: value })
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
    {errors?.NewPassword && <p style={{ color: '#f5222d', marginTop: '-20px' }}>{errors?.NewPassword?.message}</p>}{' '}
  </div>

  <Form.Item>
    <Button type="primary" htmlType="submit" className={styles.form__button}>
      Изменить
    </Button>
  </Form.Item>
</Form>
</div>

  );
}

export default ResetPassword


