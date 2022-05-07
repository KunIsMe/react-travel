import React from "react";
import styles from './RegisterPage.module.css';
import { UserLayout } from '../../layouts';
import { RegisterForm } from './RegisterForm';

export const RegisterPage: React.FC = () => {
    return (
        <UserLayout>
            <RegisterForm />
        </UserLayout>
    );
}
