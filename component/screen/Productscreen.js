import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, StatusBar, Alert } from 'react-native';
import { Searchbar, Badge } from 'react-native-paper';
import { get_all, get_all_by_id, get_all_post } from './../API/api';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NumberFormat from 'react-number-format';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const Main = ({ navigation, route }) => {
    const [categoryid, setCategoryId] = useState(route.params.categoryId)
    const [categoryname, setCategoryName] = useState(route.params.categoryName)
    const [params, setParams] = useState(route.params.params)
    const [productall, setProductAll] = useState([])
    const [productpathimage, setProductPathImage] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        firstrun()
    }, [])

    const firstrun = async () => {
        getAllProduct(categoryid, params)
        console.log(`Category ${categoryid}`)
    }
    const getAllProduct = async (id, param) => {
        if (id === 0 && param === 'all') {
            const url = '/product'
            const data = await get_all(url)
            setProductAll(data.data)
            setProductPathImage(data.product_image_url)
            setIsLoading(false)
        } else if (id !== '' && param === 'category') {
            const url = '/product/category'
            const data = await get_all_by_id(url, id)
            setProductAll(data.data.data)
            setProductPathImage(data.data.product_image_url)
            setIsLoading(false)
        } else {
            const datas = {
                keyword: categoryname
            }
            const url = '/product/search'
            const data = await get_all_post(url, datas)
            setProductAll(data.data.data)
            setProductPathImage(data.data.product_image_url)
            setIsLoading(false)
        }

    }


    const Product = (val) => {
        if (val === 0) {
            return <Text>Kategori ini belum memiliki produk</Text>
        } else {
            return (
                productall.map((data, index) =>
                    <TouchableOpacity key={index} onPress={() => navigation.navigate('Detail', { productId: data.id, vendorId: data.vendor_id })} style={style.ProductItem}>
                        <Image source={{ uri: `${productpathimage}/${data.image}` }} resizeMethod="resize" style={{ width: '100%', height: hp('18%'), alignSelf: 'center', borderTopRightRadius: 8, borderTopLeftRadius: 8 }} />
                        <Text style={[{ fontFamily: 'MontserratAlternates-Regular', fontSize: 13, fontWeight: 'bold', marginTop: 10, marginLeft: 10, marginRight: 10, }]}>{data.name}</Text>
                        <Badge style={[{ fontSize: 10, fontWeight: 'bold', color: 'white', alignSelf: 'flex-start', marginLeft: 10, marginRight: 10, }]}>{data.vendor_name}</Badge>
                        <NumberFormat
                            value={data.price}
                            displayType={'text'}
                            thousandSeparator={true}
                            renderText={formattedValue => <Text style={{ marginLeft: 10, marginRight: 10, marginTop: 5, fontWeight: 'bold', fontSize: 16 }}>Rp {formattedValue}</Text>} />
                    </TouchableOpacity>
                )
            )
        }
    }

    return (
        <ScrollView style={style.Wrapper}>
            {isLoading ? (
                <View>
                    <SkeletonPlaceholder>
                        <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
                            <View style={{ width: wp('46%'), height: 200, marginTop: 10, borderRadius: 8, margin: 5 }} />
                            <View style={{ width: wp('46%'), height: 200, marginTop: 10, borderRadius: 8, margin: 5 }} />
                            <View style={{ width: wp('46%'), height: 200, marginTop: 10, borderRadius: 8, margin: 5 }} />
                            <View style={{ width: wp('46%'), height: 200, marginTop: 10, borderRadius: 8, margin: 5 }} />
                            <View style={{ width: wp('46%'), height: 200, marginTop: 10, borderRadius: 8, margin: 5 }} />
                            <View style={{ width: wp('46%'), height: 200, marginTop: 10, borderRadius: 8, margin: 5 }} /> 
                            <View style={{ width: wp('46%'), height: 200, marginTop: 10, borderRadius: 8, margin: 5 }} />
                            <View style={{ width: wp('46%'), height: 200, marginTop: 10, borderRadius: 8, margin: 5 }} /> 
                        </View>
                    </SkeletonPlaceholder>
                </View>
            ) : (
                    <View style={{ backgroundColor: 'white', padding: 20 }}>
                        <View style={style.CategoryTitle}>
                            <Text style={[style.TextStyle, { fontSize: 16 }]}>Produk "{categoryname}"</Text>
                        </View>
                        <View style={style.ProductWrapper}>
                            <Product />
                        </View>
                    </View>
                )}
        </ScrollView>
    )
}

const style = StyleSheet.create({
    Wrapper: {
        //padding: 20,
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