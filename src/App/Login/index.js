import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row, Col, Layout, notification } from 'antd';
import userService from '~/api/user';
import LoginForm from './loginForm';
import styles from './index.module.scss';
import logoTop from './img/logo_10.png';
import picCenterH from './img/pic_center.png';
import loginLogoH from './img/sys_logo.png';
class Login extends Component {
  onLogin = async values => {
    await userService.login(values).catch(err => {
      notification.warning({
        message: '登陆失败',
        description: err.message
      });
    });
  };

  render() {
    return (
      <div className={styles.app}>
        <Layout>
          <Layout.Content>
            <Row className={styles['app-row']}>
              <Col className={styles['login-left']} span={12}>
                <img className={styles['pic-center']} src={picCenterH} alt="picCenter" />
              </Col>
              <Col span={12}>
                <div className={styles['app-header']}>
                  <img className={styles['login-top']} src={logoTop} alt="logotop" />
                  <div className={styles['app-logo']}>
                    <div className={styles['app-logo-title']}>
                      <img
                        src={loginLogoH}
                        alt="loginLogo"
                        style={{ width: '250px', textAlign: 'center' }}
                      />
                    </div>

                    <div className={styles['app-logo-form']}>
                      <LoginForm login={this.onLogin} />
                    </div>
                  </div>
                </div>
              </Col>
              <div className={styles.bottom}>
                aaaa
              </div>
            </Row>
          </Layout.Content>
        </Layout>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
  history: PropTypes.object
};

export default withRouter(Login);
