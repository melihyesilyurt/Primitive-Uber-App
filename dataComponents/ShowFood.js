import React, {useEffect} from 'react'
import { StyleSheet, Text, View, Image,FlatList,TouchableOpacity } from 'react-native'
import tw from "tailwind-react-native-classnames";
import AsyncStorage from '@react-native-async-storage/async-storage';
import useState from 'react-hook-use-state';

const data= [
    {
        id: "789",
    },
 ];

const ShowFood = () => {
    const [destination, setdestination] = useState("");
    const [travelTime, settravelTime] = useState(0);
    const [price, setprice] = useState(0);
    const [title, settitle] = useState("");
    var prices= 0;
    var travelTimes= 0;
    var destinations= "";
    var titles = "";

    const clickhandler = () => {
        settitle(titles);
        setprice(prices);
        setdestination(destinations);
        settravelTime(travelTimes);
      }

    const load = async () => {
        try {
            let jsonValue = await AsyncStorage.getItem("Foodinfo")
            if(jsonValue != null)
            {
                titles=JSON.parse(jsonValue).title;
                prices=JSON.parse(jsonValue).price;
                travelTimes=JSON.parse(jsonValue).travelTime;
            }
        } catch (error) {
          // Error retrieving data
        }
        try {
          let jsonValues = await AsyncStorage.getItem("FoodRoadinfo")
          if(jsonValues != null)
          {
            destinations=JSON.parse(jsonValues).origin;
          }
      } catch (error) {
        // Error retrieving data
      }
      {clickhandler()};
      };

    useEffect(function() {
        {load()}
    });
    return (
        <View style = {tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}> Your Previous Food Order </Text>
            <FlatList data={data} 
            renderItem={() => (
            <TouchableOpacity style={tw`flex-row items-center p-5`} >
                    <View style ={tw`-ml-6`}>
                        <Text style={tw `text-xl font-semibold`}>  {title}</Text>
                        <Text style = {tw`text-xl font-semibold`}>   {price} TL </Text>
                    </View>
                    <View>
                        <Text style = {tw`text-xl font-semibold`}>  Travel Time: {travelTime}</Text>      
                        <Text style = {tw`font-semibold`}>  Destination: {destination} </Text>
                    </View>
            </TouchableOpacity>
    )} />       
        </View>
    )
}

export default ShowFood

const styles = StyleSheet.create({})
