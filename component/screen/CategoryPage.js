import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, StatusBar, Alert } from 'react-native';
import { Searchbar, Badge } from 'react-native-paper';
import { get_all, get_all_by_id } from './../API/api';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import NumberFormat from 'react-number-format';
import axios from 'axios'

const Main = ({ navigation, route }) => {
    const [categoryall, setCategoryAll] = useState([])

    useEffect(() => {
        getAllCategory()
    }, [])

    const getAllCategory = async () => {
        const data = await get_all('/category')
        console.log(data)
        setCategoryAll(data.data)
    }

    return (
        <ScrollView style={style.Wrapper}>
            {/* Produk */}
            <View style={style.CategoryItem}>
                    {categoryall.slice(0, 8).map((data, index) =>
                        <TouchableOpacity key={index} onPress={() => navigation.navigate('Product', { categoryId: data.id, categoryName: data.name })} >
                            <Image source={{ uri: data.icon }} style={{ width: wp('8%'), height: hp('4%'), alignSelf: 'center' }} />
                            <Text style={[{ alignSelf: 'center', fontSize: 10, marginTop: 5, textAlign: 'center' }]}>{data.name}</Text>
                        </TouchableOpacity>
                    )}
                </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    Wrapper: {
        padding: 20,
        backgroundColor: 'white'
    },
    TextStyle: {
        fontFamily: 'MontserratAlternates-Regular',
        fontSize: 12,
        fontWeight: 'bold',
        color: 'black'
    },
    CategoryWrapper: {

        flexWrap: 'wrap',
        padding: 20,
    },
    CategoryTitle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingLeft: 20,
        // paddingRight: 20,
    },
    CategoryItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: 10,
        padding: 25
    },
    VendorWrapper: {
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#f0932b',
        //marginTop: 20,
        marginBottom: 20,
    },
    VendorItem: {
        flex: 1,
        alignContent: 'center',
        width: wp('35%'),
        backgroundColor: 'white',
        borderRadius: 8,
        marginRight: 5,
        marginTop: 10,
        paddingBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    ProductWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: 10,
        marginBottom: 20,
    },
    ProductItem: {
        width: wp('44%'),
        backgroundColor: 'white',
        borderRadius: 8,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        paddingBottom: 20
    }

})

const styles = StyleSheet.create({
    wrapper: {
        height: hp('50%')
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
})

export default Main;