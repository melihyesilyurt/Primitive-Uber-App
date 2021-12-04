import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';


const FoodCard = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style = {tw`bg-white flex-1`}>
            <Text style={tw`text-center py-20 text-xl`}>Your Order Has Been Received</Text>
            
            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
                    <Icon name="car" type= "font-awesome" color= "black" size= {16 }/>
                    <Text style={tw`text-black text-center`}>Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("FoodOptionsCard")} style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
                    <Icon name="fast-food-outline" type= "ionicon" color= "white" size= {16 }/>
                    <Text style={tw`text-white text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        
    );
};

export default FoodCard

const styles = StyleSheet.create({});
