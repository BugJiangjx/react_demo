import React from 'react';
import { Button } from 'antd';
import styles from './style.module.scss';

const User = () => {
  return (
    <div className={styles.div}>
      <div className={styles.leftDiv}>
        <a href='/user/111'>详情</a>
      </div>
      <div className={styles['right-div']}>
        <div className={styles['right-top-div']}></div>
        <div className={styles['right-bottom-div']}></div>
      </div>
    </div>
  );
};

export default User;