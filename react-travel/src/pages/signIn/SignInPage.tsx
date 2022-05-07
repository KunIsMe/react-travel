import React from "react";
import styles from './SignInPage.module.css';
import { UserLayout } from '../../layouts';
import { SignInForm } from './SignInForm';

export const SignInPage: React.FC = () => {
    return (
        <UserLayout>
            <SignInForm />
        </UserLayout>
    );
}
