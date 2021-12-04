import React from 'react'
import { StyleSheet, Text, View, SafeAreaView,TouchableOpacity } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from "../components/NavFavourites";
import { Icon } from 'react-native-elements';

const TravelCard = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style = {tw`bg-white flex-1`}>
            <Text style={tw`text-center py-20 text-xl`}> Your vehicle will arrive as soon as possible. We wish you a good trip.</Text>
            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                <TouchableOpacity onPress={() => navigation.navigate("RideOptionsCard")} style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
                    <Icon name="car" type= "font-awesome" color= "white" size= {16 }/>
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
                    <Icon name="fast-food-outline" type= "ionicon" color= "black" size= {16 }/>
                    <Text style={tw`text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default TravelCard
