import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom'
import React from 'react';

import styles from './SideBar.module.scss'
const { Header, Content, Footer, Sider } = Layout;

const SideBar = ({ routes }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
      <Sider 
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="logo" />
<Menu style={{marginTop:-26, width:300, height:'200vh', paddingTop:30, backgroundColor: '#00457E', overflow: "hidden",
          scrollbarWidth: "none"}} mode="inline">
  {routes.map((route) => (
    <Menu.Item key={route.path} icon ={React.createElement(route.icon)} className={styles.sidebar}>
      <Link to={route.path} style={{ textDecoration: 'none' }}>{route.label}</Link>
    </Menu.Item>
  ))}
</Menu>    
      </Sider>

  );
};
export default SideBar;

