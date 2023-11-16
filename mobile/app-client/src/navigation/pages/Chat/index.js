import * as React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Modal, TouchableOpacity } from 'react-native';



const Chat = ({navigation}) => {
    const handleHomeScreen = async  () =>{
        navigation.navigate('HomeScreen')
    }
    
    return(
        <View
            style={{
                flex:1,
                justifyContent:'center',
                alignContent:'center',
                alignItems:'center'
            }}>
                <TouchableOpacity onPress={handleHomeScreen}>
                <Text>asdasd</Text>

                </TouchableOpacity>
        </View>
    )
}




export default Chat;