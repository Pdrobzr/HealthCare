import * as React from 'react';


import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import HomeScreen from './pages/Home';
import ProfileScreen from './pages/Profle';
import MapsScreen from './pages/Maps';

//CustomTab
import CustomTabBar from '../components/CustomTabBar';
//Screens names

const homeName = 'Home';
const profileName = 'Configurações';
const mapsName = 'Mapa';
const Tab = createBottomTabNavigator();


 const MainContainer = ({ navigation }) => {

    return (
        <NavigationContainer  independent={true}>
        <Tab.Navigator initialRouteName={homeName} screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            tabBarActiveTintColor: 'rgba(0, 112, 239, 0.8)',
            tabBarStyle: {
                borderTopWidth: 0,
                backgroundColor: "#FFF"
            }
        }


        } tabBar={(props) => <CustomTabBar {...props}  />}>

            <Tab.Screen
                name={mapsName} 
                component={MapsScreen}
                options={{
                    tabBarIcon: "location"
                }} 
             />
            <Tab.Screen 
                name={homeName} 
                component={HomeScreen}
                options={{
                    tabBarIcon: "home"
                }}  
            />
            <Tab.Screen 
                name={profileName} 
                component={ProfileScreen}
                options={{
                    tabBarIcon: "settings"
                }}  
            />

        </Tab.Navigator>
    </NavigationContainer>
    );
  };




export default MainContainer;