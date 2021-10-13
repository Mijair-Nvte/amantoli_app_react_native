import React, { useCallback, useState } from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import { IconButton } from "react-native-paper"
import { Icon } from 'react-native-elements'
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { size } from "lodash"
import AddressList from "../../components/Address/AddressList"
import { getAddressesApi } from "../../api/address"
import useAuth from "../../hooks/useAuth"
import Search from "../../components/Search"
import colors from '../../styles/colors'

export default function Addresses() {

    const [addresses, setAddresses] = useState(null);

    const [reloadAddress, setReloadAddress] = useState(false);

    const {auth} = useAuth();

    const navigation = useNavigation();

    useFocusEffect(
        useCallback( () => {
                setAddresses(null);
                (async () => {
                    const response = await getAddressesApi(auth);
                    setAddresses(response);
                    setReloadAddress(false);
                })();
            }, [reloadAddress],
        )
    );

    return (
        <>
            <Search/>
            <ScrollView style={styles.container}>
                <Text style={styles.title} >Mis direcciones</Text>
                <TouchableWithoutFeedback 
                    onPress={() => navigation.navigate("add-address")}
                >
                    <View style={styles.addAddress}>
                        <Text style={styles.addAddressText}>Añadir una dirección</Text>
                        <Icon
                            raised
                            name='chevron-right'
                            type='font-awesome'
                            size={18}
                            color={colors.fontPrice}
                        />
                    </View>
                </TouchableWithoutFeedback>
                {!addresses ? (
                    <ActivityIndicator size="large" style={styles.loading} />
                ) : size(addresses) === 0 ? (
                    <Text style={styles.noAddressText}>Crea tu primera direccion</Text>
                ) : (
                    <AddressList 
                        addresses={addresses} 
                        setReloadAddress={setReloadAddress}
                    />
                )}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 20
    },
    addAddress: {
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: "#ddd",
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    addAddressText: {
        fontSize: 16
    },
    loading: {
        marginTop: 20
    },
    noAddressText : {
        fontSize: 16,
        marginTop: 10,
        textAlign: "center"
    }
})