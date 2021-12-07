import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image,TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import NavFavourites from "../components/NavFavourites";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <TouchableOpacity onPress={() => navigation.navigate("HistoryScreen")}
            style ={tw`bg-gray-100 absolute top-16 right-8 z-50 p-3 rounded-full`}>
                <Icon name="tag" />
            </TouchableOpacity>
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

              <GooglePlacesAutocomplete 
              placeholder= "Where From?" 
              styles={{container: { flex: 0,}, textInput: { fontSize: 18,},}} 
              onPress ={(data, details = null) => {
                console.log(data);
                dispatch(setOrigin({
                    location: details.geometry.location,
                    description: data.description,
                })
                );

                dispatch(setDestination(null));
              }}
              fetchDetails={true}
              returnKeyType={"search"}
              enablePoweredByContainer={false}
              minLength={2}
              query= {{key: 'AIzaSyDlHuSSsZ3Pm0d_ncCZryAGICKOyewgRKI', language: 'en',}} 
              nearbyPlacesAPI= "GooglePlacesSearch" 
              debounce={400}/>  

                <NavOptions />
                
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    text: {
        color: "blue",
    },
});
