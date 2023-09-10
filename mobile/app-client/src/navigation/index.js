import * as React from 'react';


import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import HomeScreen from './pages/Home';
import ProfileScreen from './pages/Profle';
import MapsScreen from './pages/Maps';

//Screens names

const homeName = 'Home';
const profileName = 'Configurações';
const mapsName = 'Mapa';

const Tab = createBottomTabNavigator();
export default function MainContainer(){
    return(
       <NavigationContainer>
        <Tab.Navigator initialRouteName={homeName} screenOptions={({route}) => ({
            tabBarIcon: ({focused,color,size}) => {
                let iconName;
                let rn = route.name;

                if(rn === homeName){
                    iconName = focused ? 'home' : 'home-outline'
                }else if (rn === mapsName){
                    iconName = focused ? 'location' : 'location-outline'
                }else if (rn === profileName){
                    iconName = focused ? 'settings' : 'settings-outline'
                }
                
                return <Ionicons name={iconName} size={size} color={color}/>

            },
        })} >
     
        <Tab.Screen name={mapsName} component={MapsScreen}/>
        <Tab.Screen name={homeName} component={HomeScreen}/>
        <Tab.Screen name={profileName} component={ProfileScreen}/>

        </Tab.Navigator>
       </NavigationContainer>
    )
}