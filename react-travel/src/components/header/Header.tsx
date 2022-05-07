import React, { useState, useEffect } from "react";
import logo from '../../assets/logo.svg';
import styles from './Header.module.css';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { changeLanguageActionCreator } from '../../redux/language/languageActions';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import jwt_decode, { JwtPayload as DefaultJwtPayload } from 'jwt-decode';
import { userSlice } from '../../redux/user/slice';

interface JwtPayload extends DefaultJwtPayload {
    username: string
}

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const language = useSelector((state) => state.language.language);
    const languageList = useSelector((state) => state.language.languageList);
    const jwt = useSelector(state => state.user.token);
    const dispatch = useDispatch();
    const menuClickHandler = (e) => {
        const action = changeLanguageActionCreator(e.key);
        dispatch(action);
    };

    const [username, setUsername] = useState("");

    const shoppingCartItems = useSelector(s => s.shoppingCart.items);
    const shoppingCartLoading = useSelector(s => s.shoppingCart.loading);

    useEffect(() => {
        if (jwt) {
            const token = jwt_decode<JwtPayload>(jwt);
            setUsername(token.username);
        }
    }, [jwt]);

    const onLogout = () => {
        dispatch(userSlice.actions.logOut());
        navigate('/');
    }

    return (
        <div className={styles['app-header']}>
            <div className={styles['top-header']}>
                <div className={styles.inner}>
                    <Typography.Text>{ t("header.slogan") }</Typography.Text>
                    <Dropdown.Button
                        style={{ marginLeft: 15 }}
                        overlay={
                            <Menu onClick={menuClickHandler}>
                                { languageList.map((language) => {
                                    return (
                                        <Menu.Item key={language.code}>{ language.name }</Menu.Item>
                                    );
                                }) }
                            </Menu>
                        }
                        icon={
                            <GlobalOutlined />
                        }
                    >
                        { language === 'zh' ? "中文" : "English" }
                    </Dropdown.Button>
                    { jwt ? (
                        <Button.Group className={styles['button-group']}>
                            <span>
                                { t("header.welcome") }
                                <Typography.Text strong>{ username }</Typography.Text>
                            </span>
                            <Button loading={shoppingCartLoading} onClick={() => navigate('/shoppingCart')}>
                                { t("header.shoppingCart") }({ shoppingCartItems.length })
                            </Button>
                            <Button onClick={onLogout}>{ t("header.signOut") }</Button>
                        </Button.Group>
                    ) : (
                        <Button.Group className={styles['button-group']}>
                            <Button onClick={() => navigate('/register')}>{ t("header.register") }</Button>
                            <Button onClick={() => navigate('/signIn')}>{ t("header.signin") }</Button>
                        </Button.Group>
                    ) }
                </div>
            </div>
            <Layout.Header className={styles['main-header']}>
                <span onClick={() => navigate('/')}>
                    <img src={logo} alt="logo" className={styles['App-logo']} />
                    <Typography.Title level={3} className={styles.title}>{ t("header.title") }</Typography.Title>
                </span>
                <Input.Search 
                    placeholder={'请输入旅游目的地、主体或关键字'} 
                    className={styles['search-input']}
                    onSearch={(keywords) => navigate(`/search/${keywords}`)}
                >
                </Input.Search>
            </Layout.Header>
            <Menu mode={"horizontal"} className={language === 'zh' ? styles['main-menu'] : styles['main-menu-change']}>
                <Menu.Item key={1}>{ t("header.home_page") }</Menu.Item>
                <Menu.Item key={2}>{ t("header.weekend") }</Menu.Item>
                <Menu.Item key={3}>{ t("header.group") }</Menu.Item>
                <Menu.Item key={4}>{ t("header.backpack") }</Menu.Item>
                <Menu.Item key={5}>{ t("header.private") }</Menu.Item>
                <Menu.Item key={6}>{ t("header.cruise") }</Menu.Item>
                <Menu.Item key={7}>{ t("header.hotel") }</Menu.Item>
                <Menu.Item key={8}>{ t("header.local") }</Menu.Item>
                <Menu.Item key={9}>{ t("header.theme") }</Menu.Item>
                <Menu.Item key={10}>{ t("header.custom") }</Menu.Item>
                <Menu.Item key={11}>{ t("header.study") }</Menu.Item>
                <Menu.Item key={12}>{ t("header.visa") }</Menu.Item>
                <Menu.Item key={13}>{ t("header.enterprise") }</Menu.Item>
                <Menu.Item key={14}>{ t("header.high_end") }</Menu.Item>
                <Menu.Item key={15}>{ t("header.outdoor") }</Menu.Item>
                <Menu.Item key={16}>{ t("header.insurance") }</Menu.Item>
            </Menu>
        </div>
    );
}
