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
const ShowRide = () => {
    const [travelTime, settravelTime] = useState(0);
    const [price, setprice] = useState(0);
    const [title, settitle] = useState("");
    const [start, setstart] = useState("");
    const [finish, setfinish] = useState("");
    var prices= 0;
    var traveltimes= 0;
    var starts= "";
    var finishs= "";
    var titles = "";

    const clickhandler = () => {
      settitle(titles);
      setprice(prices);
      setstart(starts);
      setfinish(finishs);
      settravelTime(traveltimes);
    }
    const load = async () => {
      try {
          let jsonValue = await AsyncStorage.getItem("Carinfo")
          if(jsonValue != null)
          {
              titles=JSON.parse(jsonValue).title;
              prices=JSON.parse(jsonValue).price;
              traveltimes=JSON.parse(jsonValue).travelTime;
          }
      } catch (error) {
        // Error retrieving data
      }
      try {
        let jsonValues = await AsyncStorage.getItem("Roadinfo")
        if(jsonValues != null)
        {
          starts=JSON.parse(jsonValues).origin;
          finishs=JSON.parse(jsonValues).destination;
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
            <Text style={tw`text-center py-5 text-xl`}> Your Previous Journey </Text>
            <FlatList data={data} 
            renderItem={() => (
            <TouchableOpacity style={tw`flex-row items-center p-5`} >
                    <View style ={tw`-ml-6`}>
                        <Text style={tw `text-xl font-semibold`}>  {title}</Text>
                        <Text style = {tw`text-xl font-semibold`}>   {price} TL </Text>
                    </View>
                    <View>
                        <Text style = {tw`text-xl font-semibold`}>  Travel Time: {travelTime}</Text>      
                        <Text style = {tw`font-semibold`}>  Start: {start} </Text>
                        <Text style = {tw`font-semibold`}>  Finish: {finish} </Text>
                    </View>
            </TouchableOpacity>
    )} />       
        </View>       
    )  
}

export default ShowRide
const styles = StyleSheet.create({})