import { Input, Button, Form, Popconfirm, message, Typography, Image  } from 'antd';
import { codeWordSchema } from '../../utils/schemaUtil'
import styles from './StartPage.module.scss'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { newPasswordUser, CodewordUser, resetSuccess, resetError } from '../../store/userSlice'
import courseIllustration from '../../assets/course_illustration.png'
import faqIllustration from '../../assets/faq_illustration.png'
import passwordIllustration from '../../assets/password_illustration.png'
import progressIllustartion from '../../assets/progress_illustration.png'
import updateIllustartion from '../../assets/update_illustration.png'
import appealsIllustartion from '../../assets/appeals_illustration.png'
const { Title, Paragraph } = Typography

function StartPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { username, token, id, codeword, success, error } = useSelector((state) => state.user)

  const onSubmit = (data) => {
     console.log(data, "пиздааааааааааа")
     data.id=id
     dispatch(CodewordUser(data)) 
  }


    const renderParagraph = (text) => {
      const separatorIndex = text.indexOf(':');
      const beforeColon = text.slice(0, separatorIndex + 1);
      const afterColon = text.slice(separatorIndex + 1);
  
      return (
        <Paragraph style={{fontSize:"20px"}}>
          <span style={{ fontWeight: 'bold', fontSize:"20px" }}>{beforeColon}</span>
          {afterColon}
        </Paragraph>
      );
    };


  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    mode: 'onBlur',
  })

  return (
    <div className={styles.form}>
       {success && message.success('Кодовое слово задано') && dispatch(resetSuccess())}
       {error && message.success('Кодовое слово задано') && dispatch(resetError())}
       <Title level={1}>Добро пожаловать на портал корпоративного обучения!</Title>
       <Paragraph>
          <span style={{fontSize:"20px" }}>Добро пожаловать на наш портал корпоративного обучения! Ниже приведены рекомендации, которые помогут вам ориентироваться на сайте:</span>
        </Paragraph>
      {!codeword && <div >
        {renderParagraph('- Задайте кодовое слово: Рекомендуется установить кодовое слово для безопасности вашей учетной записи.')}
      <h2 style={{ marginBottom: 20 }}>Задайте кодовое слово</h2>
      <Form
        name="normal_password"
        initialValues={{ remember: true }}
        onFinish={handleSubmit(onSubmit)}
      >
                  <label style={{ marginBottom: '20px', fontSize:"20px" }}>Введите кличку вашего первого питомца:</label>
        <Form.Item name="codeword">

          <Controller
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Кодовое слово"
                className={`${styles['form__input']} ${
                  errors?.Codeword && styles['authorization__input--error']
                }`}
                type="codeword"
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
        <div>
          {' '}
          {errors?.Codeword && (
            <p style={{ color: '#f5222d', marginTop: '-20px' }}>{errors?.Codeword?.message}</p>
          )}{' '}
        </div>

        <Form.Item>
          <Popconfirm
            placement="top"
            title={
              <>
                Вы уверены, что хотите задать именно это кодовое слово?
                <br />
                Вы должны его запомнить, вы не сможете его изменить
              </>
            }
            description={'Задать слово?'}
            onConfirm={handleSubmit(onSubmit)}
            okText="Да"
            cancelText="Нет"
          >
            <Button type="primary"  className={styles.form__button}>
              Задать
            </Button>
          </Popconfirm>
        </Form.Item>
      </Form>
      </div>
      }

{renderParagraph('- Смените пароль: Для обеспечения безопасности вашей учетной записи  регулярно меняйте пароль. Вы можете сделать это в разделе "Смена пароля". Пожалуйста, выберите надежный пароль, состоящий из комбинации букв, цифр и специальных символов.')}
      <Image
       src={passwordIllustration}
        alt="Иллюстрация 2"
        width={700}
      />
  {renderParagraph(' - Вкладка "Частозадаваемые вопросы": Если у вас есть вопросы, рекомендуем сначала ознакомиться с разделом "Частозадаваемые вопросы". Здесь вы найдете ответы на часто задаваемые вопросы от других пользователей. Пожалуйста, прочитайте этот раздел перед тем, как задавать свой вопрос, чтобы избежать повторений.')}
      <Image
        src={faqIllustration}
        alt="Иллюстрация 2"
        width={700}
      />
{renderParagraph(' - Вкладка "Курсы": Здесь вы найдете все доступные курсы, которые вам необходимо пройти. Каждый курс подразделен на разделы, которые требуют прохождения тестов. После успешного прохождения теста в каждом разделе, не забудьте нажать кнопку "Закончить курс", чтобы отметить его как пройденный.')}
      <Image
        src={courseIllustration}
        alt="Иллюстрация 2"
        width={700}
      />
          {renderParagraph('- Поле для вопросов и предложений: В каждом курсе есть поле для вопросов и предложений, где вы можете задавать вопросы, делиться своими мыслями или предлагать улучшения. Будьте активными и задавайте вопросы, если у вас возникают затруднения или нужна помощь.')}
      <Image
       src={appealsIllustartion}
        alt="Иллюстрация 2"
        width={700}
      />
          {renderParagraph(' - Вкладка "Прогресс": Здесь вы можете отслеживать свой прогресс и просматривать список пройденных курсов по датам. Это поможет вам оценить свои достижения и увидеть свой прогресс в обучении.')}
      <Image
        src={progressIllustartion}
        alt="Иллюстрация 2"
        width={700}
      />
                {renderParagraph('- Пройдите обновленный курс: Если у вас есть уведомление о том, что курс обновился, пожалуйста, пройдите и посмотрите, что обновилось. Это поможет вам оставаться в курсе всех изменений и новой информации.')}
      <Image
       src={updateIllustartion}
        alt="Иллюстрация 3"
        width={700}
      />
          {renderParagraph('Мы рекомендуем вам ознакомиться со всей информацией на стартовой странице, чтобы у вас не возникало никаких затруднений в использовании нашего сайта. Если у вас возникнут дополнительные вопросы, не стесняйтесь писать в форму обращений в каждом курсе.')}
          <Paragraph>
          <span style={{ fontWeight: 'bold', fontSize:"20px" }}>Удачного обучения!</span>
        </Paragraph>

    </div>
  );
}

export default StartPage;