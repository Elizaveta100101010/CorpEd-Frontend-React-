import React, { useState, useEffect } from 'react';
import { Card, Spin, Pagination, message } from 'antd';
import { getAppeals, resetError } from '../../store/appealsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './UsersQuestions.module.scss';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const UserCard = ({ login, course, question }) => {
  return (
    <Card title={login} style={{ marginBottom: 16, borderColor:"rgba(31, 87, 170, 0.4)", width:800 }}>
      <p>
        <strong>Курс:</strong> {course}
      </p>
      <p>
        <strong>Вопрос:</strong> {question}
      </p>
    </Card>
  );
};

const UsersQuestions = () => {
  const { data, loading, error } = useSelector((state) => state.appeal);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Количество элементов на странице

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppeals());
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataset = data ? [...data].reverse().slice(startIndex, endIndex) : null;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.form}>
      <h2 style={{ marginBottom: 20 }}>Вопросы пользователей</h2>
      {error && message.error('Что-то пошло не так') && dispatch(resetError())}
      {loading ? (
        <Spin indicator={antIcon} />
      ) : (
        <div>
          {dataset.map((user) => (
            <UserCard
              key={user._id}
              login={user.login}
              course={user.course}
              question={user.question}
            />
          ))}
          <Pagination
            current={currentPage}
            total={data ? data.length : 0}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default UsersQuestions;
