import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectDestination, selectOrigin, setTravelTimeInformation } from "../slices/navSlice";
import MapViewDirections from 'react-native-maps-directions';
import { useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    const save = async () => {
        let foodlastroad = {
          origin: origin.description,
        }
        await AsyncStorage.setItem("FoodRoadinfo",JSON.stringify(foodlastroad));

      };
    useEffect(() => {
        if (!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        });
    }, [origin, destination]);

    useEffect(() => {
        if (!origin || !destination) return;

        const getTravelTime = async () => {

            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${'AIzaSyDlHuSSsZ3Pm0d_ncCZryAGICKOyewgRKI'}`).then((res) => res.json())
            .then((data) => {
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
            });
        };
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
        </MapView>
    );
};

export default Map

const styles = StyleSheet.create({})
