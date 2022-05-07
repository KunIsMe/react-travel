import React, { useEffect } from "react";
import styles from './SignInForm.module.css';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { signIn } from '../../redux/user/slice';

export const SignInForm: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loading = useSelector(state => state.user.loading);
    const jwt = useSelector(state => state.user.token);
    const error = useSelector(state => state.user.error);

    useEffect(() => {
        if (jwt !== null) {
            navigate('/');
        }
    }, [jwt]);

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        dispatch(signIn({
            email: values.username,
            password: values.password
        }));
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={styles['sign-in-form']}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
