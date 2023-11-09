import * as React from 'react';
import {View , Text} from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({navigation}){

    return(
        <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
            <Text onPress={() => alert('Esta é a "Pagina" inicial')}
            style={{fontSize:26,fontWeight:'bold'}}>Tela de inicio</Text>
        </View>
    );
}