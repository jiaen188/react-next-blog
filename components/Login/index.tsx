import {useState} from 'react';
import styles from './index.module.scss';

interface IProps {
  isShow: boolean;
  onClose: Function;
}

const Login = ({isShow = false, onClose}: IProps) => {


  const [form, setForm] = useState({
    phone: '',
    verify: ''
  });

  const handleClose = () => {

  }

  const handleGetVerifyCode = () => {

  }

  const handleLogin = () => {

  }

  const handleOAuthGithub = () => {
    
  }

  return (
    isShow ? (
      <div className={styles.loginArea}>
        <div className={styles.loginBox}>
          <div className={styles.loginTitle}>
            <div>
              手机号
            </div>
            <div className={styles.close} onClick={handleClose}>x</div>
          </div>
          <input name="phone" type="text" placeholder="请输入手机号" value={form.phone} />

          <div className={styles.verifyCodeArea}>
            <input name="verify" type="text" placeholder="请输入验证码" value={form.verify} />
            <span className={styles.verifyCode} onClick={handleGetVerifyCode}>获取验证码</span>
          </div>

          <div className={styles.loginBtn} onClick={handleLogin}>登录</div>

          {/* 三方登录 */}
          <div className={styles.otherLogin} onClick={handleOAuthGithub}>GitHub</div>
          {/* 协议登录 */}
          <div className={styles.loginPrivacy}>
            注册登录即表示同意
            <a href="" target="_blank">隐私政策</a>
          </div>
        </div>
      </div>
    ) : null
  )
}

export default Login;