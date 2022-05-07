import React from "react";
import styles from './SideMenu.module.css';
import { sideMenuList } from './mockup';
import { Menu } from 'antd';
import { GifOutlined } from '@ant-design/icons';

export const SideMenu: React.FC = () => {
    return (
        <Menu mode={'vertical'} className={styles['side-menu']}>
            { sideMenuList.map((one, index) => {
                return (
                    <Menu.SubMenu key={`side-menu-one-${index}-${one.title}`} title={<span><GifOutlined />{one.title}</span>}>
                        { one.subMenu.map((two, twoIndex) => {
                            return (
                                <Menu.SubMenu key={`side-menu-two-${twoIndex}-${two.title}`} title={<span><GifOutlined />{two.title}</span>}>
                                    { two.subMenu.map((three, threeIndex) => {
                                        return (
                                            <Menu.Item key={`side-menu-three-${threeIndex}-${three}`}>
                                                <span><GifOutlined />{three}</span>
                                            </Menu.Item>
                                        )
                                    }) }
                                </Menu.SubMenu>
                            )
                        }) }
                    </Menu.SubMenu>
                )
            }) }
        </Menu>
    );
}
