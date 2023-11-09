import * as React from 'react';
import {View , Text, StyleSheet,Pressable} from 'react-native';
import Input from '../../../components/CustomInputs';
import { FontAwesome } from '@expo/vector-icons';



export default function ProfileScreen({navigation}){
    return(
        <View style={{flex:1, alignItems: 'center', }}>
           {/* <Text onPress={() => navigation.navigate('Home')}
            style={{fontSize:26,fontWeight:'bold'}}>Pagina de perfil</Text> */}

            <View style={styles.backTitle} >
           <FontAwesome 
                name="angle-left" 
                size={50} 
                color={'#4A4444'} 
                style={styles.icon} 
            />
            <Text style={styles.backTitleText}  >Sair</Text>
           </View>
           <View style={styles.formsInput}>
                <View style={styles.contentTitle}>
                    <Text style={styles.titleText}>DADOS PESSOAIS</Text>
                </View>
                <Input placeholder="Nome" iconName="user" iconSize={24} />
                <Input placeholder="Email" iconName="envelope" iconSize={23} />
                <Input secureTextEntry={true} placeholder="Senha" iconName="lock" iconSize={24}  />
                <View style={styles.buttonsContet}>
                    <Pressable style={styles.buttonChangeData} >
                        <Text style={styles.formsButtonText}>ALTERAR DADOS</Text>
                    </Pressable>
                    <Pressable style={styles.buttonDeleteAccount} >
                        <Text style={styles.formsButtonText}>DELETAR CONTA</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
  

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
        left: 20,
        bottom: 50,
    },
 
    titleText: {
        fontFamily: "Montserrat-Bold",
        color: '#4A4444',
        fontSize: 40,
    },
    formsInput:{
        position:'absolute',
        alignContent:'center',
        justifyContent:'center',
        top:250
    },
    buttonsContent:{
        flex:1,
    
    },
    buttonChangeData: {
        alignSelf: 'center',
        textAlign: 'center',
        width: 150,
        height: 50,
        margin: 10,
        backgroundColor: '#FFB800',
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonDeleteAccount: {
        alignSelf: 'center',
        textAlign: 'center',
        width: 150,
        height: 50,
        margin: 10,
        backgroundColor: '#FF4545',
        alignItems: 'center',
        justifyContent: 'center',

    },
    formsButtonText: {
        color: '#fff',
        fontFamily: "Montserrat-SemiBold",
        fontSize: 15,
    },

})