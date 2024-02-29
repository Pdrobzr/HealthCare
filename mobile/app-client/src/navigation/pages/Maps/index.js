import * as React from 'react';

import { useState, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';



export default function MapsScreen({ navigation }) {

  const [location, setLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      console.log("Localização",location.coords)


      setInitialRegion({
        latitude: location.coords.latitude,
        longitude:location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();

    
  }, []);

 //let text = 'Waiting..';
 //if (errorMsg) {
 //  text = errorMsg;
 //} else if (location) {
 //  text = JSON.stringify(location);
 //}

  return (
    <View style={styles.container}>

        <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: -23.9991,
          longitude: -46.4133,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton>
          ()
          {location && (
                  <Marker
                  coordinate={{
                    latitude: -23.9991,
                    longitude: -46.4133,
                  }}
                  title='Sua localização'
                  ></Marker>
          )}
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});