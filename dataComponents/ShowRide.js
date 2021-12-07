import React, {useEffect} from 'react'
import { StyleSheet, Text, View, Image,FlatList,TouchableOpacity } from 'react-native'
import tw from "tailwind-react-native-classnames";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from "react-native-elements";
import useState from 'react-hook-use-state';
const data= [
   {
       id: "789",
       icon: "location",
       location: "Your Location",
       destination: "Your current location",
   },
];
const ShowRide = () => {
    //var titles= "hi";
    const [travelTime, settravelTime] = useState(0);
    const [price, setprice] = useState(0);
    const [title, settitle] = useState("ali");
    const [start, setstart] = useState("");
    const [finish, setfinish] = useState("");
    const [car, setcar] = useState("https://links.papareact.com/7pf");
    const prices= 0;
    const traveltimes= 0;
    const starts= "";
    const finishs= "";
    const cars ="https://links.papareact.com/7pf";
    const titles = "";

    const clickhandler = () => {
      //settitle(titles);
      setprice(prices);
      setstart(starts);
      setfinish(finishs);
      settravelTime(traveltimes);
      setcar(cars);
    }
    const load = async () => {
      try {
          let jsonValue = await AsyncStorage.getItem("Carinfo")
          if(jsonValue != null)
          {
            console.log("çalışıyor")
              console.log(JSON.parse(jsonValue).title)
              //console.log(JSON.parse(jsonValue).title)
              //titles=JSON.parse(jsonValue).title;
              //prices=JSON.parse(jsonValue).price;
              //settitle(JSON.parse(jsonValue).title);
              //console.log(title);
              //console.log(prices)
              //traveltimes=JSON.parse(jsonValue).traveltime;
              //cars=JSON.parse(jsonValue).Image;
          }
      
      } catch (error) {
        // Error retrieving data
      }
      try {
        let jsonValues = await AsyncStorage.getItem("Roadinfo")
        if(jsonValues != null)
        {
          //console.log(JSON.parse(jsonValues).destination)
        }
    } catch (error) {
      // Error retrieving data
    }
    };
    
    useEffect(function() {
      {load()}
      {clickhandler()}
    });
    
    return (
        <View style = {tw`bg-green-300 flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}> Your Previous Journey </Text>
            <FlatList data={data} 
            renderItem={() => (
            <TouchableOpacity style={tw`flex-row items-center p-5`} >
              
                <Image
                        style={{
                            width: 100,
                            height: 100,
                            resizeMode: "contain",
                        }}
                        source={{ uri: car }}
                        />
                    <View style ={tw`-ml-6`}>
                        <Text style={tw `text-xl font-semibold`}>  {title} title</Text>
                        <Text style = {tw`text-xl font-semibold`}>   {price} TL </Text>
                    </View>
                    <View>
                        <Text style = {tw`text-xl font-semibold`}>  Travel Time: {travelTime}</Text>
                        
                        <Text style = {tw`text-xl font-semibold`}>  Start: {start} </Text>
                        <Text style = {tw`text-xl font-semibold`}>  Finish: {finish} </Text>
                    </View>
            </TouchableOpacity>
    )} />       
        </View>       
    )  
}

export default ShowRide

const styles = StyleSheet.create({})
