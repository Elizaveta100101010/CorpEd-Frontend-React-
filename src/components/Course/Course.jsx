import React from 'react';
import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Card, Tag, Row, Col } from 'antd';
import { getCompleted } from '../../store/completedSlice'
import { CheckCircleOutlined } from '@ant-design/icons';

const CourseCard = ({ _id, title, tags, description, url }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCompleted())
  }, [])
  const { username} = useSelector((state) => state.user)
  const { data, loading} = useSelector((state) => state.completed)
  const filtered = data ? data.filter(obj => obj.login === username) : data;

  const showCheckMark = filtered? filtered.some(obj => obj.course === title): null;

  return (
    <Card style={{ width: 900, marginTop: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={url} alt="Course Image" style={{ marginRight: 16, width: 200, height: 150, borderRadius: "5px" }} />
        <div>
          <Link to={`/courses/${_id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <h2 style={{ cursor: 'pointer' }}>{title}</h2>
          </Link>
          <div>{tags.map(tag => <Tag key={tag} style={{ backgroundColor: "rgba(31, 87, 170, 0.1)", borderColor: "blue" }}>{tag}</Tag>)}</div>
          <p style={{ marginTop: 10 }}>{description}</p>
        </div>
        {showCheckMark && (
          <div style={{ marginLeft: 'auto' }}>
            <CheckCircleOutlined style={{ color: 'green', fontSize: 30 }} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default CourseCard;