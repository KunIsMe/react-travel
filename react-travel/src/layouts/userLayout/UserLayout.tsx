import React from "react";
import styles from './UserLayout.module.css';
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { Layout, Menu, Dropdown, Button } from "antd";

const { Header, Footer, Content } = Layout;

export const UserLayout: React.FC = ({ children }) => {

    const menu = (
        <Menu>
          <Menu.Item>中文</Menu.Item>
          <Menu.Item>English</Menu.Item>
        </Menu>
      );

    return (
        <Layout className={styles["user-layout-container"]}>
            <Header className={styles["header"]}>
                <div className={styles["lang"]}>
                    <Dropdown overlay={menu}>
                        <Button>
                            {" "}
                            选择语言 <CaretDownOutlined />
                        </Button>
                    </Dropdown>
                </div>
            </Header>
            <Content className={styles["content"]}>
                <div className={styles["top"]}>
                    <div className={styles["content-header"]}>
                        <Link to="/">
                            <img alt="logo" className={styles["logo"]} src={logo} />
                            <span className={styles["title"]}>React 旅游网</span>
                        </Link>
                    </div>
                    <div className={styles["desc"]}>
                        想要使用本网站吗？那客官就先请登录吧！
                    </div>
                    { children }
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Hello，我是 Footer ！</Footer>
        </Layout>
    );
}
