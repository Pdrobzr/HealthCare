import * as React from 'react';

import { useState, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet, TextInput, Platform } from 'react-native';
import * as Location from 'expo-location';
import { blips } from './Markers/blips';
import { FontAwesome } from '@expo/vector-icons';

export default function MapsScreen({ navigation }) {

  const [location, setLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

 
  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        //setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
   

      setInitialRegion({
        
      });
    })();

    
  }, []);

  const mapStyle = [
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}></View>
        <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: -23.9991,
          longitude:-46.4133,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton
        customMapStyle={mapStyle}
        >
           {blips.map((blips, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude:blips.latitude,
                longitude:blips.longitude
              }}
              title={blips.name}
        
            />
          ))}
          
        </MapView>
        <View style={styles.searchBox}>
              <TextInput
                placeholder='Pesquisar'
                placeholderTextColor='#000'
                autoCapitalize='none'
                style={{flex:1,padding: 0}}
              />
                <FontAwesome
                   name="search"
                   size={15}
                   color={'#000'}
                />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox:{
    position:'absolute',
    marginTop: Platform.OS == 'ios' ? 40 : 40,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#fff',
    width:'90%',
    alignSelf:'center',
    borderRadius:5,
    padding: 10,
    shadowColor:'#ccc',
    shadowOffset: {widht: 0,height: 3},
    shadowOpacity: 0.5,
    shadowRadius:5,
    elevation:10,
  }

});