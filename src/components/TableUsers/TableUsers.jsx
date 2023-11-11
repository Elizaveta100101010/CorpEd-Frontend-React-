import React, { useState,useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Input, Button, Space, Progress, Popconfirm, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { LoadingOutlined } from '@ant-design/icons';
import { getallUsers} from '../../store/allUsersSlice'
import { getCompleted} from '../../store/completedSlice'
import { deleteUser, resetSuccess, resetError} from '../../store/userSlice'
import { getPositions} from '../../store/positionsSlice'
import { Spin } from 'antd';
import styles from './TableUsers.module.scss'

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const TableUsers = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const searchInput = useRef(null);

  const { dataU, loading } = useSelector((state) => state.allUsers)
  const { data } = useSelector((state) => state.completed)
  const { token, success, error } = useSelector((state) => state.user)
  const { positionss } = useSelector((state) => state.positions)
  const [dataState, setDataState] = useState();


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getallUsers())
    dispatch(getCompleted())
    dispatch(getPositions())
  }, [])


  const calculateProgress = () => {
    const progressDataU = dataU.map((dataUObj) => {
      const { login, position } = dataUObj;
      const positionObj = positionss.find((pos) => pos.position == position);
      const courses = positionObj ? positionObj.courses : [];
      const uniqueCourses = new Set();
  
      data.forEach((dataObj) => {
        if (dataObj.login == login) {
          if (courses.includes(dataObj.course)) {
            uniqueCourses.add(dataObj.course);
          }
        }
      });
  
      const numerator = uniqueCourses.size;
      const denominator = courses.length;
      const progress = denominator > 0 ? numerator / denominator*100 : 0;
  
      return { ...dataUObj, progress };
    });
  
    return progressDataU;
  };


  useEffect(() => {
    if (dataU && data && positionss) {
      const progressDataU = calculateProgress()
      console.log(progressDataU, "МРАЗЬ")
      setDataState(progressDataU);
    }
  }, [dataU]);

  const pagination = {
    pageSize: 5 // количество элементов на странице
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Поиск`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Поиск
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Сброс
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Фильтр
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Закрыть
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
 
  const columns = [
    {
      title: 'Логин',
      dataIndex: 'login',
      key: 'login',
      width: '20%',

      ...getColumnSearchProps('login'),
    },
    {
      title: 'Должность',
      dataIndex: 'position',
      key: 'position',
      width: '20%',

      ...getColumnSearchProps('position'),
    },
    {
      title: 'Прогресс',
      dataIndex: 'progress',
      key: 'progress',
      width: '5%',

      sortDirections: ['descend', 'ascend'],
      render: (progress) =>   <Progress
      type="circle"
      size="small"
      percent={progress}
      strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }}
    />,
    },
    {
      title: 'Действия',
      key: 'action',
      render: (login) => (
        <Space size="middle">
          <Link to={`/admin/change/user/${login._id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <Button >Редактировать</Button>
          </Link>
          <Popconfirm
                placement="top"
                title={'Вы уверены что хотите удалить пользователя? '}
                description={'Удалить пользователя?'}
                onConfirm={() => handleDelete(login)}
                okText="Да"
                cancelText="Нет"
              >
          <Button>Удалить</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleDelete = (login) => {
   const newData = [...dataState];
    const index = newData.findIndex((item) => login._id === item._id);
    newData.splice(index, 1);
    setDataState(newData)
    dispatch(deleteUser({ id: login._id, token }))
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    console.log(record)
    // Open edit form here
  };
console.log(dataState, "look")
  return (
    <div className={styles.form}>
      <h2>Все пользователи</h2>
          {success && message.success('Пользователь удален') && dispatch(resetSuccess())}
          {error && message.error('Что-то пошло не так') && dispatch(resetError())}
    { loading || !dataState  ? <Spin indicator={antIcon} /> :
    <Table
    style={{margin:30, width:800}}
      columns={columns}
      dataSource={dataState}
      bordered
      size="large"
      scroll={{ x: 'max-content' }}
      pagination={pagination}
    />}
    </div>
  );
};

export default TableUsers;