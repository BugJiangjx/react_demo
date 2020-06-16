import React, { useState, useEffect } from 'react';
import { Table, notification } from 'antd';
import userService from '~/api/user';
import styles from './style.module.scss';

const User = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await userService
      .getUserPageByNameOrAccount({})
      .then((item) => {
        setList(item.content);
      })
      .catch((err) => {
        notification.warning({
          message: '查询失败',
          description: err.message,
        });
      });
  };

  const columns = [
    {
      title: '用户名',
      dataIndex: 'userName',
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
    },
    {
      title: '部门',
      dataIndex: 'departmentName',
    },
    {
      title: '手机号',
      dataIndex: 'mobilePhone',
    }
  ];

  return (
    <div className={styles.div}>
      <div className={styles.leftDiv}></div>
      <div className={styles['right-div']}>
        <div className={styles['right-top-div']}></div>
        <div className={styles['right-bottom-div']}>
          <Table rowKey={record => record.id} dataSource={list} columns={columns} pagination={false} bordered={false} />
        </div>
      </div>
    </div>
  );
};

export default User;
