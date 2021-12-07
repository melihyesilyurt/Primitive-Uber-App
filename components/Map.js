import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectDestination, selectOrigin, setTravelTimeInformation } from "../slices/navSlice";
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useState from 'react-hook-use-state';

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const [lat, setlat] = useState(0);
    const [lng, setlng] = useState(0);
    const save = async () => {
        let lastroad = {
          origin: origin.description,
          destination: destination.description,
        }
        await AsyncStorage.setItem("Roadinfo",JSON.stringify(lastroad));

      };
      const load = async () => {
        try {
            let jsonValue = await AsyncStorage.getItem("userLocation")
            if(jsonValue != null)
            {
                console.log(JSON.parse(jsonValue))
                setlat(JSON.parse(jsonValue).lat)
                setlng(JSON.parse(jsonValue).lng)
            }
        } catch (error) {
          // Error retrieving data
        }
      };
    useEffect(() => {
        
        if (!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        });
    }, [origin, destination]);

    useEffect(() => {
        if (!origin || !destination) return;
        {load();}
        const getTravelTime = async () => {

            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${'AIzaSyDlHuSSsZ3Pm0d_ncCZryAGICKOyewgRKI'}`).then((res) => res.json())
            .then((data) => {
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
            });
        };
        console.log("origin   "+origin.description)
        console.log("destination   "+ destination.description)
        {save();}
        
        getTravelTime();
    }, [origin, destination, 'AIzaSyDlHuSSsZ3Pm0d_ncCZryAGICKOyewgRKI']);

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType="mutedStandard"
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
            }}
        >
            {origin && destination && (
                <MapViewDirections
                    lineDashPattern={[0]} // I added
                    origin={origin.description}
                    destination={destination.description}
                    apikey={'AIzaSyDlHuSSsZ3Pm0d_ncCZryAGICKOyewgRKI'}
                    strokeWidth={3}
                    strokeColor="black"
                />
            )}


            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title="Origin"
                    description={origin.description}
                    identifier="origin"
                />
                
            )}
          
            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="Destination"
                    description={destination.description}
                    identifier="destination"
                />
            )}
           <Marker
                    coordinate={{
                        latitude: lat,
                        longitude:lng,
                    }}
                    title="User"
                    identifier="User's Location"
             />
        </MapView>
    );
};

export default Map

const styles = StyleSheet.create({})
