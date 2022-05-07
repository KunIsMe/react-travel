import React from "react";
import styles from './PlaceOrder.module.css';
import { PaymentForm, CheckOutCard } from '../../components';
import { MainLayout } from '../../layouts/mainLayout';
import { Row, Col } from 'antd';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { placeOrder } from '../../redux/order/slice';

export const PlaceOrderPage: React.FC = () => {

    const dispatch = useDispatch();

    const jwt = useSelector(store => store.user.token) as string;
    const loading = useSelector(store => store.order.loading);
    const order = useSelector(store => store.order.currentOrder);

    return (
        <MainLayout>
            <Row>
                <Col span={12}>
                    <PaymentForm />
                </Col>
                <Col span={12}>
                    <CheckOutCard
                        loading={loading}
                        order={order}
                        onCheckout={() => {
                            dispatch(placeOrder({jwt, orderId: order.id}));
                        }}
                    />
                </Col>
            </Row>
        </MainLayout>
    );
}
