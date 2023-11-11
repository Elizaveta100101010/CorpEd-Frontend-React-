import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {
ADMIN_REGISTRATION_ROUTE,
ADMIN_COURSES_ROUTE,
ADMIN_USERS_ROUTE,
ADMIN_FINISHED_ROUTE,
ADMIN_SUGGESTIONS_ROUTE,
ADMIN_STATISTICS_ROUTE,
ADMIN_POSITIONS_ROUTE,
ADMIN_QUESTION_ROUTE,
ADMIN_EDIT_ROUTE,
USER_RULES_ROUTE,
USER_COURSES_ROUTE,
USER_PROGRESS_ROUTE,
USER_FAQ_ROUTE,
USER_PASSWORD_ROUTE,
ADMIN_CREATE_ROUTE,
  } from './routesUtil'


 export const adminPanel = [
    {
      path: ADMIN_REGISTRATION_ROUTE,
      icon: UserOutlined,
      label: "Регистрация пользователя",
    },
    {
      path: ADMIN_COURSES_ROUTE,
      icon: VideoCameraOutlined,
      label: "Курсы",
    },
    {
      path: ADMIN_CREATE_ROUTE,
      icon: VideoCameraOutlined,
      label: "Создание курса",
    },
    {
      path: ADMIN_USERS_ROUTE,
      icon: UploadOutlined,
      label: "Пользователи",
    },
    {
        path: ADMIN_FINISHED_ROUTE,
        icon: UserOutlined,
        label: "Пройденные курсы",
      },
      {
        path: ADMIN_SUGGESTIONS_ROUTE,
        icon: UploadOutlined,
        label: "Обращения пользователей",
      },
      {
        path: ADMIN_POSITIONS_ROUTE,
        icon: VideoCameraOutlined,
        label: "Добавить новую позицию",
      },
      {
        path: ADMIN_QUESTION_ROUTE,
        icon: VideoCameraOutlined,
        label: "Добавить новый вопрос FAQ",
      },
      {
        path: ADMIN_EDIT_ROUTE,
        icon: UploadOutlined,
        label: "Редактирование профиля",
      },
  ];

  export const userPanel = [
    {
      path: USER_RULES_ROUTE,
      icon: UserOutlined,
      label: "Правила пользования сайтом",
    },
    {
      path: USER_COURSES_ROUTE,
      icon: VideoCameraOutlined,
      label: "Ваши курсы",
    },
    {
      path: USER_PROGRESS_ROUTE,
      icon: UploadOutlined,
      label: "Прогресс",
    },
      {
        path: USER_FAQ_ROUTE,
        icon: VideoCameraOutlined,
        label: "Часто задаваемые вопросы",
      },
      {
        path: USER_PASSWORD_ROUTE,
        icon: UploadOutlined,
        label: "Смена пароля",
      },
  ];