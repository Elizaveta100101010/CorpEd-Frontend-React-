
import { useSelector, useDispatch } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, message } from 'antd';
import { useRef, useState, useEffect } from 'react';
import { getCompleted, resetError } from '../../store/completedSlice'
import Highlighter from 'react-highlight-words';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import moment from 'moment';
import styles from './CompletedCourses.module.scss'
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const CompletedCourses = ({filtered}) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const { username, position } = useSelector((state) => state.user)
  const searchInput = useRef(null);
  const pagination = {
    pageSize: 5 // количество элементов на странице
  }

  const { data, loading, error } = useSelector((state) => state.completed)
  const filteredObjects = (data && position != 'admin') ? filtered: data;
  const dispatch = useDispatch()
  let tableData =[]
  if (filteredObjects){
  tableData = filteredObjects.map(item => ({
    ...item,
    time: moment(item.createdAt).format("HH:mm DD.MM.YYYY") // добавляем новое свойство "createdAd"
  }));}

console.log(tableData,"here")

  useEffect(() => {
   if(!filtered)  dispatch(getCompleted())
  }, [])

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
      width: '25%',
      ...getColumnSearchProps('login'),
    },
    {
      title: 'Курс',
      dataIndex: 'course',
      key: 'course',
      width: '40%',
      ...getColumnSearchProps('course'),
    },
    {
      title: 'Дата',
      dataIndex: 'time',
      key: 'time',
      ...getColumnSearchProps('time'),
      sortDirections: ['descend', 'ascend'],
    },
  ];
  return (    <div className={!filtered && styles.form}>
    {error && message.error('Что-то пошло не так') && dispatch(resetError())}
   {!filtered &&<h2>Пройденные курсы</h2>} 
    { loading  ? <Spin indicator={antIcon} /> :
  <Table style={{ width:600, margin:30}}columns={columns} dataSource={tableData} pagination={pagination} />}</div>);
};
export default CompletedCourses;