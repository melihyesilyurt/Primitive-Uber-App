import React, { Component } from "react";
import { StyleSheet, Text, Touchable, View,FlatList, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
const data= [
    {
        id: "789",
        icon: "location",
        location: "Your Location",
        destination: "To update your location Please click.",
    },
];

const NavFavourites = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    var userlocations;
    const save = async () => {
        let userLocation = {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        }
        await AsyncStorage.setItem("userLocation",JSON.stringify(userLocation));
      };
    
      const load = async () => {
        try {
            let jsonValue = await AsyncStorage.getItem("userLocation")
            if(jsonValue != null)
            {
                userlocations=JSON.parse(jsonValue);
                console.log(userlocations);
            }
        } catch (error) {
          // Error retrieving data
        }
      };

    useEffect(() => {
        save();
        (async () => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            setErrorMsg(
            'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
            );
            return;
        }
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
    <SafeAreaView>
    <FlatList data={data} keyExtractor={(item) => item.id}
    ItemSeparatorComponent={() =>( <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
    )}
    renderItem={({item: { location, destination, icon}}) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`} 
        onPress ={() =>{save();load(); }}>
           <Icon
           style={tw`mr-4 rounded-full bg-gray-300 p-3`}
           name={icon}
           type="ionicon"
           color="white"
           size={18}
           />
           <View>
               <Text style={tw`font-semibold text-lg`}>{location}</Text>
               <Text style={tw`text-gray-500`}>{destination}</Text>
           </View>
           
        </TouchableOpacity>
       
    )} 
    />
         <View>
            <Text>{userlocations}</Text>
        </View>
    </SafeAreaView>
    
    
    )
}

export default NavFavourites

const styles = StyleSheet.create({})
