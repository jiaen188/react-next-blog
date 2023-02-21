import {useState} from 'react';
import {Button, Dropdown, Avatar, Menu} from 'antd';
import {LogoutOutlined, HomeOutlined, UserOutlined} from '@ant-design/icons';
import type {NextPage} from 'next';
import Link from 'next/link';
import {useRouter} from 'next/router';
import styles from './index.module.scss';
import {navs} from './config';
import Login from 'components/Login';
import {useStore} from 'store';

const Navbar: NextPage = () => {
  const store = useStore();
  const {userId, avatar, nickname} = store.user.userInfo;
  const {pathname} = useRouter();

  const [isShowLogin, setIsShowLogin] = useState(false);

  const handleViewEdit = () => {};

  const handleLogin = () => {
    setIsShowLogin(true);
  };

  const handleClose = () => {
    setIsShowLogin(false);
  };

  const handleLogout = () => {
    store.user.setUserInfo({});
  };

  const handleProfile = () => {
    // todo 去个人主页
  };

  const DropDownMenu = (
    <Menu>
      <Menu.Item key="item-1">
        <UserOutlined></UserOutlined>&nbsp;{nickname}
      </Menu.Item>
      <Menu.Item key="item-2" onClick={handleProfile}>
        <HomeOutlined></HomeOutlined>&nbsp;个人主页
      </Menu.Item>
      <Menu.Item key="item-3" onClick={handleLogout}>
        <LogoutOutlined></LogoutOutlined>&nbsp;退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.navbar}>
      <section className={styles.logoArea}>BLOG-C</section>
      <section className={styles.linkArea}>
        {navs?.map((nav) => (
          <Link key={nav.label} href={nav.value} className={pathname === nav.value ? styles.active : ''}>
            {nav.label}
          </Link>
        ))}
      </section>
      <section className={styles.operationArea}>
        <Button onClick={handleViewEdit}>写文章</Button>
        {userId ? (
          <Dropdown overlay={DropDownMenu} placement="bottomLeft">
            <Avatar src={avatar}></Avatar>
          </Dropdown>
        ) : (
          <Button type="primary" onClick={handleLogin}>
            登录
          </Button>
        )}
      </section>
      <Login isShow={isShowLogin} onClose={handleClose}></Login>
    </div>
  );
};

export default Navbar;
