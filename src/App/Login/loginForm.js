import React, { Component } from 'react';
import { Form, Input, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import styles from './loginForm.module.scss';

const FormItem = Form.Item;

class LoginForm extends Component {
  state = {
    loading: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, login } = this.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          await this.setState({
            loading: true
          });
          await login(values);
        } catch (error) {
          console.log(error);
        } finally {
          this.setState({
            loading: false
          });
        }
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    return (
      <div className={styles['login-form']}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('account', {
              rules: [{ required: true, message: '请输入账号' }]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: '#fff' }} />}
                placeholder={`请输入账号`}
                className={styles['login-input']}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: '#fff' }} />}
                type="password"
                placeholder={`请输入密码`}
                className={styles['login-input']}
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              htmlType="submit"
              className={styles['login-form-button']}
              size="default"
              loading={this.state.loading}
            >
              <span>登陆</span>
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  form: PropTypes.object,
  login: PropTypes.func
};

export default Form.create()(LoginForm);
