
import { View,Text,StyleSheet ,TouchableOpacity,Platform, Pressable,TextInput, Image} from 'react-native';
import * as React from 'react';
//import {useFonts,Montserrat_600SemiBold} from '@expo-google-fonts/montserrat';


export default function Login(){
 //   const [fonteLoaded] = useFonts({
 //       Montserrat_600SemiBold,
 //   });
 //   if (!fonteLoaded) {
 //       return null;
 //   }
    return(
        <View style={styles.container}>
           <View style={styles.image}>
                <Image
                     style={styles.imgLogo}
                     source={require('../../../assets/logo.png')}
                 />
            </View>
            <View style={styles.contentTitle}>
                <Text style={styles.subTitle}>Prossiga com o seu</Text>
                <Text style={styles.titleText}>Login</Text>
            </View>
           <View style={styles.formsInput}>
                <TextInput style={styles.formsTextInput} placeholder='Usuário'></TextInput>
                <TextInput style={styles.formsTextInput} placeholder='Senha'></TextInput>
                <Pressable style={styles.buttonLogin}>
                     <Text style={styles.formsButtonText}>Login</Text>
                </Pressable> 
           </View>
           
           
        </View>
    )
}


const styles = StyleSheet.create ({
    container: {
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        flexDirection:'column',
        justifyContent: 'nowrap',
    },
    image:{
        flex:1,
        top:50,
    },
    imgLogo: {
        width:360, 
        height: 300,
        alignSelf: 'center',
        
    },
    contentTitle:{
        flex:0.2,
        position:'fixed'
    },
    subTitle:{

    },
    titleText:{
        align:'left',
    },
    formsInput:{
        flex:1,
    },
    formsTextInput:{
        height: 45,
        borderWidth: 1,
        borderColor: '#222',
        margin: 10,
        fontSize: 20,
        padding: 10,
        borderRadius: 8
    },  
    buttonLogin:{
        alignSelf: 'center',
        textAlign: 'center',
        width: 350,
        height: 50,
        margin: 10,
        backgroundColor: '#6CA8DA',
        alignItems:'center',
        justifyContent:'center',
    },
    formsButtonText:{
        color:'#fff',
       
    }
})