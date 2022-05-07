import React, { useEffect } from "react";
import styles from './SearchPage.module.css';
import { FilterArea, ProductList } from '../../components';
import { useParams, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { searchProduct } from '../../redux/productSearch/slice';
import { MainLayout } from '../../layouts';

export const SearchPage: React.FC = () => {

    const { keywords } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.productSearch.loading);
    const error = useSelector((state) => state.productSearch.error);
    const productList = useSelector((state) => state.productSearch.data);
    const pagination = useSelector((state) => state.productSearch.pagination);

    useEffect(() => {
        dispatch(searchProduct({
            keywords,
            nextPage: 1,
            pageSize: 10
        }));
    }, [location]);

    const onPageChange = (nextPage, pageSize) => {
        dispatch(searchProduct({
            keywords,
            nextPage,
            pageSize
        }));
    }

    if (loading) {
        return (
            <Spin 
                size="large" 
                style={{
                    marginTop: 200,
                    marginBottom: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%"
                }}
            />
        );
    }
    if (error) {
        return (
            <div>网站出错：{ error }</div>
        );
    }
    return (
        <MainLayout>
            {/* 分类过滤器 */}
            <div className={styles['product-list-container']}>
                <FilterArea />
            </div>
            {/* 产品列表 */}
            <div className={styles['product-list-container']}>
                <ProductList
                    data={productList}
                    paging={pagination}
                    onPageChange={onPageChange}
                />
            </div>
        </MainLayout>
    );
}
