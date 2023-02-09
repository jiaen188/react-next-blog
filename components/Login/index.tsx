import {ChangeEvent, useState} from 'react';
import {message} from 'antd'
import styles from './index.module.scss';
import CountDown from 'components/CountDown';
import request from 'service/fetch'

interface IProps {
  isShow: boolean;
  onClose: Function;
}

const Login = ({isShow = false, onClose}: IProps) => { 

  const [form, setForm] = useState({
    phone: '',
    verify: ''
  });

  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleClose = () => {
    onClose && onClose();
  }

  // 获取验证码
  const handleGetVerifyCode = () => {
    setIsShowVerifyCode(true);

    if (!form?.phone) {
      message.warning('请输入手机号');
      return;
    }

    request.post('/api/user/sendVerifyCode', {
      to: form?.phone,
      templateId: 1
    }).then((res: any) => {
      console.log(res);
      if (res?.code === 0) {
        setIsShowVerifyCode(true);
      } else {
        message?.error(res?.message || '未知错误');
      }
    });
  }

  const handleLogin = () => {
    request.post('/api/user/login', {
      ...form
    }).then((res: any) => {
      if (res?.code === 0) {
        // 登录成功
        onClose && onClose();
      } else {
        message.error(res?.msg || '未知错误');
      }
    })
  }

  const handleOAuthGithub = () => {
    
  }

  // 倒计时==0关闭
  const handleOnEnd = () => {
    setIsShowVerifyCode(false);
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
          <input name="phone" type="text" placeholder="请输入手机号" value={form.phone} onChange={handleFormChange} />

          <div className={styles.verifyCodeArea}>
            <input name="verify" type="text" placeholder="请输入验证码" value={form.verify} onChange={handleFormChange} />
            <span className={styles.verifyCode} onClick={handleGetVerifyCode}>
              {
                isShowVerifyCode ? <CountDown time={60} onEnd={handleOnEnd} /> : '获取验证码'
              }
            </span>
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