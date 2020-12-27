import React from 'react';
import { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';
import Splash from './component/screen/Splashscreen';
import Main from './component/screen/Mainscreen';
import Product from './component/screen/Productscreen';
import Detail from './component/screen/Detailscreen';
import VendorDetail from './component/screen/VendorDetailScreen';
import VendorPage from './component/screen/VendorPage';
import CategoryPage from './component/screen/CategoryPage';
import ProductUnggulan from './component/screen/ProductUnggulan'
// import Splashscreen from './component/screen/Splashscreen;'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Slash'
        screenOptions={({ route }) => ({
          //headerShown: false
        })}
        //headerMode="none"
      >
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Splashscreen" component={Splashscreen} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="Product" component={Product} options={{ title: 'Produk' }} />
        <Stack.Screen name="Productunggulan" component={ProductUnggulan} options={{ title: 'Produk Unggulan' }} />
        <Stack.Screen name="Vendordetail" component={VendorDetail} options={{ title: 'Profil UKM' }} />
        <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
        <Stack.Screen name="Vendor" component={VendorPage} options={{ title: 'UKM' }} />
        <Stack.Screen name="Category" component={CategoryPage} options={{ title: 'Kategori' }} />
      </Stack.Navigator>
    
    </NavigationContainer>)
}

export default App;