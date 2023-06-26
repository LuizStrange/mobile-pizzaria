import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { api } from "../../services/api";
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackPramsList } from "../../routes/app.routes";

type RouteDetailParams = {
    FinishOrder: {
        number: string | number;
        order_id: string;
    }
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>
export function FinishOrder() {
    const route = useRoute<FinishOrderRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

    async function handleFinishOrder() {
        try {
            await api.put('/order/finish', { order_id: route.params?.order_id });

            navigation.popToTop(); // voltar por inicio da pagina!

        } catch(err) {{
            console.log("ERRO AO FINALIZAR! " + err)
        }}
    }

    return (
        <View style={styles.container}>
            <Text style={styles.alert}>Você deseja finalizar esse pedido?</Text>
            <Text style={styles.title}>Mesa {route.params?.number}</Text>

            <TouchableOpacity style={styles.button} onPress={handleFinishOrder}>
                <Text style={styles.textButton}>Finalizar pedido</Text>
                <Feather name="shopping-cart" size={20} color="#1d1d2e" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1d1d2e",
        paddingHorizontal: "4%",
        paddingVertical: "5%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    alert: {
        fontSize: 20,
        color: "#FFF",
        fontWeight: "bold",
        marginBottom: 12
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#fff",
        marginBottom: 12
    },
    button: {
        backgroundColor: "#3FFFA3",
        flexDirection: 'row',
        width: '65%',
        height: 40,
        justifyContent: "center",
        alignItems: "center",

    },
    textButton: {
        fontSize: 18,
        marginRight: 8,
        fontWeight: 'bold',
        color: "#1d1d2e"
    }
})