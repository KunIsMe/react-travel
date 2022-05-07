import React from "react";
import styles from './ShoppingCart.module.css';
import { MainLayout } from '../../layouts/mainLayout';
import { Row, Col, Affix } from 'antd';
import { ProductList, PaymentCard } from '../../components';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { clearShoppingCartItem, checkout } from '../../redux/shoppingCart/slice';
import { useNavigate } from 'react-router-dom';

export const ShoppingCartPage: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const jwt = useSelector(store => store.user.token) as string;
    const shoppingCartItems = useSelector(store => store.shoppingCart.items);
    const loading = useSelector(store => store.shoppingCart.loading);

    return (
        <MainLayout>
            <Row>
                {/* 购物车清单 */}
                <Col span={16}>
                    <div className={styles['product-list-container']}>
                        <ProductList data={shoppingCartItems.map(shop => shop.touristRoute)} />
                    </div>
                </Col>
                {/* 支付卡组件 */}
                <Col span={8}>
                    <Affix>
                        <div className={styles['payment-card-container']}>
                            <PaymentCard
                                loading={loading}
                                originalPrice={shoppingCartItems.map(shop => shop.originalPrice).reduce((a, b) => a + b, 0)}
                                price={shoppingCartItems.map(shop => shop.originalPrice * (shop.discountPresent ? shop.discountPresent : 1)).reduce((a, b) => a + b, 0)}
                                onCheckout={() => {
                                    if (shoppingCartItems.length <= 0) {
                                        return;
                                    }
                                    dispatch(checkout(jwt));
                                    navigate('/placeOrder');
                                }}
                                onShoppingCartClear={() => {
                                    dispatch(clearShoppingCartItem({jwt, itemIds: shoppingCartItems.map(shop => shop.id)}));
                                }}
                            />
                        </div>
                    </Affix>
                </Col>
            </Row>
        </MainLayout>
    );
} 
