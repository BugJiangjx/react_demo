import React, { useEffect } from "react";
import { Layout, Menu, Icon } from 'antd';
import { NavLink as Link } from 'react-router-dom';
import { getAuthData, clear, getIsLogin } from '~/utils/Session';
import styles from './style.module.scss';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const LayoutPage = ({ children }) => {
  useEffect(() => {
    if (!getIsLogin()) {
      window.location.href = '/login';
    }
  }, []);

  const onLogout = () => {
    clear();
  };

  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <div className={styles.logo} />
        <Menu 
          theme="dark" 
          mode="inline" 
        >
          <Menu.Item key="zhuye">
            <Link to={{ pathname: '/', state: { name: '主页' }}}>
              <Icon type="home" />
              主页
            </Link>
          </Menu.Item>
          <SubMenu
            key="user"
            title={
              <span>
                <Icon type="user" />
                系统管理
              </span>
            }
          >
            <Menu.Item key="1">
              <Link to={{ pathname: '/user', state: { name: '用户' }}}>用户</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to='/user_api'>用户-Api</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to='/user_redux'>用户-Redux</Link>
            </Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0 }}>
          <div style={{ float: 'right', marginRight: 20 }}>
            <span style={{ color: '#fefefe', marginRight: 20 }}>{getAuthData() && getAuthData().userName}</span>
            <a style={{ color: '#fefefe' }} href="/login" onClick={(onLogout)}>退出</a>
          </div>
        </Header>
        <Content style={{ margin: 5 }}>
          <div style={{ background: "#f0f2f4", textAlign: "center", height: 'calc(100vh - 120px)', widht: '100%' }}>
            {children}
          </div>
        </Content>
        <Footer style={{ margin: '0 5px 5px 5px', background: "#fff", height: 40, textAlign: "center", padding: 10  }}>
          Jxjiang @ 2020-06-14
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
