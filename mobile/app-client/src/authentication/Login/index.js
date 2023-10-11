
import { View,Text,StyleSheet ,TouchableOpacity,Platform, Pressable,TextInput, Image} from 'react-native';
import * as React from 'react';
import {useFonts} from 'expo-font';
import { FloatingTitleTextInputField } from '../../components/CustomInputs/index';

export default function Login(){
    const [fontsLoaded] = useFonts({
        'Montserrat-Bold': require('../../components/fonts/Montserrat-Bold.ttf'),
        'Montserrat-SemiBold': require('../../components/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium': require('../../components/fonts/Montserrat-Medium.ttf'),
    })
    if(!fontsLoaded){
        return undefined;
    }

    state = {
        usuario: '',
        senha: '',
      }
    
      _updateMasterState = (attrName, value) => {
        this.setState({ [attrName]: value });
      }

    return(
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
           <FloatingTitleTextInputField 
                attrName = 'usuario'
                title = 'Usuario'
                value = {this.state.lastName}
                updateMasterState = {this._updateMasterState}
            />
           <FloatingTitleTextInputField 
           style={styles.formsInputText}
                attrName = 'senha'
                title = 'Senha'
                value = {this.state.lastName}
                updateMasterState = {this._updateMasterState}
            />
                <Pressable style={styles.buttonLogin}>
                     <Text style={styles.formsButtonText}>LOGIN</Text>
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
        alignItems:'flex-start',
    },
    subTitle:{
        fontFamily:"Montserrat-Medium",
        fontSize:20,
        color:'#4A4444'
    },
    titleText:{
        fontFamily:"Montserrat-Bold",
        color:'#48BBC6',
        fontSize: 50,
    },
    formsInput:{
        flex:2,
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
        fontFamily:"Montserrat-SemiBold",
        fontSize:30,
    }
})