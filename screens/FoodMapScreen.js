import React from "react";
import { StyleSheet,Text, View,TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import MapFood from "../components/MapFood";
import { createStackNavigator } from "@react-navigation/stack";
import FoodCard from "../components/FoodCard";
import FoodOptionsCard from "../components/FoodOptionsCard";
import { Icon } from "react-native-elements";
import { NavigationContainer, useNavigation } from "@react-navigation/native";


const MapScreen = () => {
    const Stack = createStackNavigator();
    const navigation = useNavigation();
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}
            style ={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full`}>
                <Icon name="menu" />
            </TouchableOpacity>

            <View style={tw`h-1/2`}>
                <MapFood />
            </View>

            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="FoodOptionsCard"
                        component={FoodOptionsCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="FoodCard"
                        component={FoodCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                   
                </Stack.Navigator>
            </View>
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({});