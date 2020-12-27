import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, StatusBar, Alert } from 'react-native';
import { Searchbar, Badge } from 'react-native-paper';
import { get_all, get_all_by_id } from './../API/api';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const Main = ({ navigation, route }) => {
    const [vendorall, setVendorAll] = useState([])
    const [vendorlogopath, setVendorLogoPath] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getAllVendor()
    }, [])

    const getAllVendor = async () => {
        const data = await get_all('/vendor')
        console.log(data)
        setVendorAll(data.data)
        setVendorLogoPath(data.meta.logo_path)
        setIsLoading(false)
    }

    return (
        <View>
            <ScrollView style={style.Wrapper} scrollEventThrottle={16}>
                {isLoading ? (
                    <View>
                        <SkeletonPlaceholder>
                            <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
                                <View style={{ width: wp('40%'), height: 125, marginTop: 10, borderRadius: 8, margin: 5 }} />
                                <View style={{ width: wp('40%'), height: 125, marginTop: 10, borderRadius: 8, margin: 5 }} />
                                <View style={{ width: wp('40%'), height: 125, marginTop: 10, borderRadius: 8, margin: 5 }} />
                                <View style={{ width: wp('40%'), height: 125, marginTop: 10, borderRadius: 8, margin: 5 }} />
                                <View style={{ width: wp('40%'), height: 125, marginTop: 10, borderRadius: 8, margin: 5 }} />
                                <View style={{ width: wp('40%'), height: 125, marginTop: 10, borderRadius: 8, margin: 5 }} />
                                <View style={{ width: wp('40%'), height: 125, marginTop: 10, borderRadius: 8, margin: 5 }} />
                                <View style={{ width: wp('40%'), height: 125, marginTop: 10, borderRadius: 8, margin: 5 }} />
                                <View style={{ width: wp('40%'), height: 125, marginTop: 10, borderRadius: 8, margin: 5 }} />
                                <View style={{ width: wp('40%'), height: 125, marginTop: 10, borderRadius: 8, margin: 5 }} />
                            </View>
                            {/* <View style={{ width: wp('100%'), height: 400}} />

                        <View style={{ paddingBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
                            <View style={{ width: 200, height: 40, marginBottom: 5 }} />
                            <View style={{ width: 80, height: 30, marginBottom: 5 }} />
                            <View style={{ width: 50, height: 20, marginBottom: 5 }} />
                            <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 30 }}>
                                <View style={{ padding: 10, borderRadius: 7, marginTop: 5, width: wp('44%'), height: 40 }} />
                                <View style={{ padding: 8, borderRadius: 7, marginTop: 5, width: wp('44%'), height: 40 }} />
                            </View>
                        </View>
                        <View style={{ padding: 20 }}>
                            <View style={{ width: 200, height: 30, marginBottom: 5 }} />

                            <View style={{ width: 250, height: 20, marginBottom: 5 }} />
                            <View style={{ width: 250, height: 20, marginBottom: 5 }} />
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', padding: 20, marginBottom: 40 }}>
                            <View style={{ width: 65, height: 65, borderRadius: 50 }} />
                            <View>
                                <View style={{ width: 125, height: 25, fontWeight: 'bold', marginLeft: 20 }} />
                                <View style={{ width: 90, height: 30, borderRadius: 7, marginTop: 5, marginLeft: 20, marginTop: 35 }} />
                            </View>
                        </View>
                        <View style={{ width: wp('100%'), height: 80, marginTop: 40 }}>

                        </View> */}
                        </SkeletonPlaceholder>
                    </View>
                ) : (
                        <View style={style.ProductWrapper}>
                            {vendorall.map((data, index) =>
                                <TouchableOpacity key={index} onPress={() => navigation.navigate('Vendordetail', { vendorId: data.id })} style={style.ProductItem}>
                                    <View style={{ backgroundColor: '#ecf0f1', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                                        {/* <LazyloadImage
                                            host="lazyload-list"
                                            style={{ width: '100%', height: hp('15%'), alignSelf: 'center', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                                            source={`${vendorlogopath}/${data.logo}`}
                                        /> */}
                                        <Image source={{ uri: `${vendorlogopath}/${data.logo}` }} resizeMethod="resize" style={{ width: '100%', height: hp('15%'), alignSelf: 'center', borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
                                    </View>
                                    <Text style={[{ fontFamily: 'MontserratAlternates-Regular', fontSize: 14, fontWeight: 'bold', marginLeft: 8, marginRight: 8, marginTop: 10 }]}>{data.name}</Text>
                                    <Text style={[{ fontSize: 8, marginLeft: 8, marginRight: 8, color: '#b2bec3' }]}>{data.address}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
            </ScrollView>
        </View>
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