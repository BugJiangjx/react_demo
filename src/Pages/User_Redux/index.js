import React, { useEffect } from 'react';
import { Table, notification } from 'antd';
import { connect } from 'react-redux';
import { getUserPageByNameOrAccount } from '~/store/reducers/user/actions';
import { listSelector } from '~/store/reducers/user/selector';
import styles from './style.module.scss';

const User = ({ list, getUserPageByNameOrAccount }) => {
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await getUserPageByNameOrAccount({});
    } catch (error) {
      notification.warning({
        message: '查询失败',
        description: error.message,
      });
    }
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


const mapStateToProps = state => ({
  list: listSelector(state)
});

export default connect(mapStateToProps, {
  getUserPageByNameOrAccount
})(User);