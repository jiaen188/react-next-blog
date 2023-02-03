import { useState } from "react";
import {Button} from 'antd'
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from './index.module.scss'
import {navs} from './config'
import Login from 'components/Login'

const Navbar: NextPage = () => {
  const {pathname} = useRouter()

  const [isShowLogin, setIsShowLogin] = useState(false)

  const handleViewEdit = () => {

  }

  const handleLogin = () => {
    setIsShowLogin(true)
  }

  const handleClose = () => {
    setIsShowLogin(false)
  }

  return (
    <div className={styles.navbar}>
      <section className={styles.logoArea}>BLOG-C</section>
      <section className={styles.linkArea}>
        {
          navs?.map(nav => (
            <Link key={nav.label} href={nav.value} className={pathname === nav.value ? styles.active : ''}>{nav.label}</Link>
          ))
        }
      </section>
      <section className={styles.operationArea}>
        <Button onClick={handleViewEdit}>写文章</Button>
        <Button type="primary" onClick={handleLogin}>登陆</Button>
      </section>
      <Login isShow={isShowLogin} onClose={handleClose}></Login>
    </div>
  )
}

export default Navbar