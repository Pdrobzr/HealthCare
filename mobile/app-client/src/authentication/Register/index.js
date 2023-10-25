
import { View, Text, StyleSheet, TouchableOpacity, Platform, Pressable, TextInput, Image } from 'react-native';
import * as React from 'react';
import { useFonts } from 'expo-font';
import Input from '../../components/CustomInputs/index';
import { FontAwesome } from '@expo/vector-icons';
export default function Register() {
    const [fontsLoaded] = useFonts({
        'Montserrat-Bold': require('../../components/fonts/Montserrat-Bold.ttf'),
        'Montserrat-SemiBold': require('../../components/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium': require('../../components/fonts/Montserrat-Medium.ttf'),
    })
    if (!fontsLoaded) {
        return undefined;
    }


    return (
        <View style={styles.container}>
         
           <View style={styles.backTitle}>
           <FontAwesome 
                name="angle-left" 
                size={50} 
                color={'#4A4444'} 
                style={styles.icon} 
            />
            <Text style={styles.backTitleText}>Voltar</Text>
           </View>
            <View style={styles.formsInput}>
                <View style={styles.contentTitle}>
                    <Text style={styles.subTitle}>Prossiga com o seu</Text>
                    <Text style={styles.titleText}>Registro</Text>
                </View>
                <Input placeholder="Nome" iconName="user" iconSize={24} />
                <Input placeholder="Email" iconName="envelope" iconSize={23} />
                <Input secureTextEntry={true} placeholder="Senha" iconName="lock" iconSize={24} />
                <Input secureTextEntry={true} placeholder="Senha" iconName="lock" iconSize={24} />
                <Pressable style={styles.buttonLogin}>
                    <Text style={styles.formsButtonText}>CADASTRAR</Text>
                </Pressable>
            

            </View>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        AlignContent:'center',
    },
    backTitle:{
        width:100,
        position:'absolute',
        top:90,
        left:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center'
    },  
    backTitleText:{
        paddingLeft:10,
        fontFamily:"Montserrat-Medium",
        color:'#4A4444',
        fontSize:24
    },  
    contentTitle: {
        right: 0,
        bottom: 60,
    },
    subTitle: {
        fontFamily: "Montserrat-Medium",
        fontSize: 20,
        color: '#4A4444'
    },
    titleText: {
        fontFamily: "Montserrat-Bold",
        color: '#48BBC6',
        fontSize: 50,
    },
    formsInput:{
        position:'absolute',
        bottom:140
    },

    buttonLogin: {
        alignSelf: 'center',
        textAlign: 'center',
        width: 350,
        height: 50,
        margin: 10,
        backgroundColor: '#6CA8DA',
        alignItems: 'center',
        justifyContent: 'center',

    },
    formsButtonText: {
        color: '#fff',
        fontFamily: "Montserrat-SemiBold",
        fontSize: 30,
    },

})