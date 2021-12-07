import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity,SafeAreaView, Image } from 'react-native'
import ShowFood from "../dataComponents/ShowFood";
import ShowRide from "../dataComponents/ShowRide";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

const HistoryScreen = () => {
    const navigation = useNavigation();
    
    return (
        <SafeAreaView style = {tw`bg-white flex-1`}>
            <View style= {tw`p-5`}>
                <Image
                    style={{
                        width: 100, 
                        height: 100, 
                        resizeMode: "contain",
                    }}
                    source={{
                        uri: "https://links.papareact.com/gzs",
                    }}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}
            style ={tw`bg-gray-100 absolute top-16 right-8 z-50 p-3 rounded-full`}>
                <Icon name="menu" />
            </TouchableOpacity>

            <View style={tw`h-1/3`}>
                <ShowRide />
            </View>

            <View style={tw`h-1/3`}>
                <ShowFood />
            </View>
        </SafeAreaView>
        
    )
}

export default HistoryScreen

const styles = StyleSheet.create({})
