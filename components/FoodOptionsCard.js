import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity,FlatList,Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const data = [
    {
        id: "Hamburger-123",
        title: "Hamburger",
        image: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        money: 35,
    },
    {
        id: "Pizza-456",
        title: "Pizza",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=481&q=80",
        money: 50,
    },
    {
        id: "Fish-789",
        title: "Fish",
        image: "https://images.unsplash.com/photo-1601314002592-b8734bca6604?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        money: 42,
    },
    {
        id: "ice-cream-123",
        title: "Ice Cream",
        image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        money: 16,
    },
    {
        id: "taco-123",
        title: "Taco",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480&q=80",
        money: 36,
    },
];

const SURGE_CHARGE_RATE =1.5;

const FoodOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    const save = async () => {
        let lastfood = {
          price: selected?.money,
          travelTime: travelTimeInformation?.duration?.text,
          image: selected?.image,
          title: selected?.title
        }
        await AsyncStorage.setItem("Foodinfo",JSON.stringify(lastfood));

      };
    return (
        <SafeAreaView>
            <View>

                <Text style={tw`text-center py-5 text-xl`}>Select a Food</Text>
            </View>

            <FlatList
            data={data} 
            keyExtractor={(item) => item.id} 
            renderItem={({ item: { id, title, multiplier,image }, item }) => (
                <TouchableOpacity
                    onPress = {() => setSelected(item)}
                    style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && "bg-gray-200"
                    }`}
                >
                    <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: "contain",
                    }}
                    source={{ uri: image }}
                    />
                    <View style ={tw`-ml-6`}>
                        <Text style={tw `text-xl font-semibold`}>{title}</Text>
                    </View>
                    <Text style = {tw`text-xl`}>
                        {item.money} TL
                    </Text>
                </TouchableOpacity>
            )}
            />

            <View style ={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`} onPress= {() => {save(); navigation.navigate("FoodCard");}}>
                    <Text style={tw`text-center text-white text-xl`}> 
                    Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default FoodOptionsCard

const styles = StyleSheet.create({});
