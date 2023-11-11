import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as createKey } from 'uuid';
import Course from '../Course';
import { getCourses, resetError } from '../../store/coursesSlice';
import { incrementUpdate } from '../../store/userSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Pagination, message, notification } from 'antd';
import moment from 'moment';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

function CourseList() {
  const currentDate = new Date();
  const { datas, loading, error } = useSelector((state) => state.courses);
  const { currentcourses, position, updates } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3); // Number of items per page

  const filteredCourses = datas && currentcourses && position !== 'admin' ? datas.filter(obj => currentcourses.includes(obj.title)) : datas;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourses());
  }, []);

  console.log(filteredCourses, "filteredObjects");
  useEffect(() => {
    position!=="admin" && !updates && filteredCourses && filteredCourses.forEach(course => {
      const updatedDate = new Date(course.updatedAt);
      const timeDiff = Math.abs(currentDate - updatedDate);
      const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      const updated = moment(course.updatedAt).format('DD.MM.YYYY');
      if (diffDays < 3 ) {
        notification.info({
          message: `Курс "${course.title}" был обновлен. Советуем проверить изменения`,
          description: `Дата изменения: ${updated}`
        });

dispatch(incrementUpdate())


      }
    });
  }, []);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = filteredCourses ? filteredCourses.slice(indexOfFirstItem, indexOfLastItem) : null;

  return (
    <React.Fragment>
      {error && message.error('Что-то пошло не так') && dispatch(resetError())}
      {!filteredCourses ? (
        <Spin indicator={antIcon} />
      ) : (
        <React.Fragment>
          <ul>
            {currentItems.map((item) => (
              <Course {...item} key={item._id} />
            ))}
          </ul>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredCourses.length}
            onChange={handlePageChange}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default CourseList;