import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {size} from "lodash"
import StatusBar from "../../components/StatusBar"
import Search from '../../components/Search'
import ScreenLoading from "../../components/ScreenLoading"
import ResultNotFound from '../../components/Search/ResultNotFound'
import ProductList from '../../components/Search/ProductList'
import { searchProductApi } from '../../api/search';
import colors from '../../styles/colors';

export default function SearchScreen(props) {
    const { route } = props;
    const { params } = route;

    const [products, setProducts] = useState(null);

    useEffect(() => {
        (async () => {
            setProducts(null);
            const response = await searchProductApi(params.search);
            setProducts(response);
        })()
    }, [params.search])

    return (
        <>
            <StatusBar backgroudColor={colors.bgDark} barStyle={"light-content"}/>
            <Search currentSearch={params.search} />
            {!products ? (
                <ScreenLoading text="Buscando productos..." />
            ) : size(products) === 0 ? (
                <ResultNotFound search={params.search} />
            ) : (
                <ProductList products={products} />
            )
            }
        </>
    )
}

