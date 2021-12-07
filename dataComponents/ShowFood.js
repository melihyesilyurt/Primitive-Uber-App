import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import tw from "tailwind-react-native-classnames";

const ShowFood = () => {
    return (
        <View style = {tw`bg-yellow-200 flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}> Your Previous Food Order </Text>
        </View>
    )
}

export default ShowFood

const styles = StyleSheet.create({})
