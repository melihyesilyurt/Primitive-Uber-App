import React from "react";
import { StyleSheet, Text, Touchable, View,FlatList, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const data= [
    {
        id: "123",
        icon: "home",
        location: "Home",
        destination: "Kartal/İstanbul, Turkey",
    },
    {
        id: "456",
        icon: "briefcase",
        location: "Work",
        destination: "Kabaoğlu, Kocaeli Üniversitesi, İzmit/Kocaeli, Turkey",
    },
    {
        id: "789",
        icon: "location",
        location: "Your Location",
        destination: "Your current location",
    },
];

const NavFavourites = () => {
    const dispatch = useDispatch();
    return <FlatList data={data} keyExtractor={(item) => item.id}
    ItemSeparatorComponent={() =>( <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
    )}
    renderItem={({item: { location, destination, icon}}) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`}>
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
    )} />;
    
}

export default NavFavourites

const styles = StyleSheet.create({})
