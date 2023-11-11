import * as React from 'react';
import {View , Text,StyleSheet} from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputSearch from '../../../components/CustomInputs/inputSearch';
export default function HomeScreen({navigation}){

    return(
        <View style={{flex:1, alignItems: 'center'}}>
            {/* <Text onPress={() => alert('Esta é a "Pagina" inicial')}
            style={{fontSize:26,fontWeight:'bold'}}>Tela de inicio</Text> */}
            <View style={styles.searchInput}>
                <InputSearch 
                        placeholder="Procurar" 
                        iconName="search" 
                        iconSize={24} 
                />
            </View>
            <View style={styles.content}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchInput:{
        position:'absolute',
        top:70
    },
    content:{
        flex:1
    },
})