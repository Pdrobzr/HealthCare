
import { View, Text, StyleSheet, TouchableOpacity, Platform, Pressable, TextInput, Image } from 'react-native';
import * as React from 'react';
import { useFonts } from 'expo-font';
import Input from '../../components/CustomInputs/index';

export default function Login() {
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
            <View style={styles.image}>
                <Image
                    style={styles.imgLogo}
                    source={require('../../../assets/logo.png')}
                />
            </View>

            <View style={styles.formsInput}>
                <View style={styles.contentTitle}>
                    <Text style={styles.subTitle}>Prossiga com o seu</Text>
                    <Text style={styles.titleText}>Login</Text>
                </View>
                <Input placeholder="Usuario" iconName="user" iconSize={24} />
                <Input secureTextEntry={true} placeholder="Senha" iconName="lock" iconSize={24} />
                <Pressable style={styles.buttonLogin}>
                    <Text style={styles.formsButtonText}>LOGIN</Text>
                </Pressable>
                <Text style={styles.subsTitle}>Não tem uma conta ?
                    <Text style={{color:'#1387F1'}}> Cadastre-se</Text>
                </Text>
                <Text style={styles.subsTitle}>Esqueceu sua senha ?
                    <Text style={{color:'#1387F1'}}> Recupere aqui</Text>
                </Text>
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
        justifyContent: 'nowrap',
    },
    image: {
        flex: 1,
        top: 50,
    },
    imgLogo: {
        width: 360,
        height: 300,
        alignSelf: 'center',

    },
    contentTitle: {
        right: 80,
        bottom: 40,
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
    formsInput: {
        bottom: 21,
        flex: 1,
        alignItems: 'center'
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
    subsTitle:{
        color:'#3E3C3C',
        
    },
})