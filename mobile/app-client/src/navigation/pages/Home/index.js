import * as React from 'react';
import {View , Text} from 'react-native';

export default function HomeScreen({navigation}){
    return(
        <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
            <Text onPress={() => alert('Esta é a "Pagina" inicial')}
            style={{fontSize:26,fontWeight:'bold'}}>Tela de inicio</Text>
        </View>
    );
}