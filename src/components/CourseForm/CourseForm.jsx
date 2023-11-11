import { Form, Input, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createCourse } from '../../store/coursesSlice'
const { TextArea } = Input;

const CourseForm = ({ id, onUpdate }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {username, token} = useSelector((state) => state.user)
  const {datas} = useSelector((state) => state.courses)
  const handleSubmit = (values) => {
    try {
      const courseData = {
        id: id,
        token: token,
        title: values.name,
        tags: values.tags.split(", "),
        description: values.description,
        url: values.picture_url,
        text: values.sections.map((section, index) => ({
          name: section.name,
          text: section.text,
          questions: section.questions.map(question => ({
            text: question.text,
            answers: question.answers
          }))
        }))
      };
      console.log(courseData, "hello")
      dispatch(onUpdate(courseData));
    } catch (error) {
      message.error('Скорее всего вы заполнили не все поля')
    }
  };


  const currentCourse = id && datas
    ? datas.find((item) => item._id === id)
    : { title: '', description: '', tags: '', text:'', url:'' }

  return (
    <Form style={{ marginTop:30, width:600 }}onFinish={handleSubmit}
    
    initialValues={{
      name: currentCourse.title,
      tags: id? currentCourse.tags.join(', '): '',
      description: currentCourse.description,
      picture_url: currentCourse.url,
      sections: currentCourse.text
    }}
    >
      <Form.Item
        label="Название курса"
        name="name"
        rules={[{ required: true, message: 'Пожалуйста ввведите название курса' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Тэги"
        name="tags"
        rules={[{ required: true, message: 'Пожалуйста введите тэг' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Описание"
        name="description"
        rules={[{ required: true, message: 'Пжалуйста введите описание' }]}
      >
        <TextArea />
      </Form.Item>

      <Form.Item
  label="URL картинки"
  name="picture_url"
  rules={[
    { required: true, message: 'Пожалуйста введите ссылку на картинку' },
    { type: 'url', message: 'Пожалуйста введите корректный URL' }
  ]}
>
        <Input />
      </Form.Item>

      <Form.List name="sections">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <div key={field.key}>
                <h3>Раздел {index + 1}</h3>
                <Form.Item
                  label="Название раздела"
                  name={[field.name, 'name']}
                  fieldKey={[field.fieldKey, 'name']}
                  rules={[{ required: true, message: 'Пожалуйста введите название курса' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Текст"
                  name={[field.name, 'text']}
                  fieldKey={[field.fieldKey, 'text']}
                  rules={[{ required: true, message: 'Пожалуйста введите текст курса' }]}
                >
                  <TextArea />
                </Form.Item>

                <Form.List name={[field.name, 'questions']}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field, index) => (
                        <div key={field.key}>
                          <h4>Вопрос {index + 1}</h4>
                          <Form.Item
                            label="Вопрос"
                            name={[field.name, 'text']}
                            fieldKey={[field.fieldKey, 'text']}
                            rules={[{ required: true, message: 'Пожалуйста введите текст вопроса' }]}
                          >
                            <TextArea />
                          </Form.Item>

                          <Form.Item
                            label="Ответ"
                            name={[field.name, 'answers']}
                            fieldKey={[field.fieldKey, 'answers']}
                            rules={[{ required: true, message: 'Пожалуйста введите ответ' }]}
                          >
                            <Input />
                          </Form.Item>

                          <Button style={{marginBottom:10}} type="dashed" danger onClick={() => remove(field.name)}>
Удалить вопрос
</Button>
</div>
))}
<Form.Item>
<Button type="dashed" onClick={() => add()}>
Добавить вопрос
</Button>
</Form.Item>
</>
)}
</Form.List>
<Button style={{marginBottom:10}}type="dashed" danger onClick={() => remove(field.name)}>
              Удалить раздел
            </Button>
          </div>
        ))}
        <Form.Item>
          <Button type="dashed" onClick={() => add()}>
            Добавить раздел
          </Button>
        </Form.Item>
      </>
    )}
  </Form.List>

  <Form.Item>
    <Button style={{fontSize:"18px", backgroundColor: "#1f57aa",
    width:"200px",
    height: "40px",
 }}type="primary" htmlType="submit">
     {id ?"Обновить курс" :"Создать курс"} 
    </Button>
  </Form.Item>
</Form>
);
};

export default CourseForm;