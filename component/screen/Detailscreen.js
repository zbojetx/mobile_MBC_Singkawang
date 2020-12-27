import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    StatusBar,
    Image,
    ScrollView,
    Linking
} from 'react-native';
import { get_all_by_id } from './../API/api';
import Swiper from 'react-native-swiper';
import NumberFormat from 'react-number-format';
import { Searchbar, Badge, Button } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated from 'react-native-reanimated';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const image_H = 400


const DetailScreen = ({ navigation, route, props }) => {

    const scrollA = useRef(new Animated.Value(0)).current
    const [isLoading, setIsLoading] = useState(true)
    const { productId } = route.params
    const [productid, setProductId] = useState(route.params.productId)
    const [vendorid, setVendorId] = useState(route.params.vendorId)
    const [vendor, setVendor] = useState('')
    const [vendorlogopath, setVendorLogoPath] = useState('')
    const [product, setProduct] = useState([])
    const [productbyvendor, setProductByVendor] = useState([])
    const [productimagepath, setProductImagePath] = useState('')

    useEffect(() => {
        getproduct(productid)
        getvendor(vendorid)
        getproductbyvendor(vendorid)
        // console.log( productid)
        console.log(route.params.vendorId)
    }, [])

    const getproduct = async (id) => {
        const url = '/product'
        const productdetail = await get_all_by_id(url, id)
        setProductImagePath(productdetail.data.product_image_url)
        setProduct(productdetail.data.data)
    }

    const getvendor = async (id) => {
        const url = '/vendor'
        const vendordetail = await get_all_by_id(url, id)
        setVendorLogoPath(vendordetail.data.meta.logo_path)
        setVendor(vendordetail.data.data)
    }

    const getproductbyvendor = async (id) => {
        const url = '/product/vendor'
        const productsbyvendor = await get_all_by_id(url, id)
        setProductByVendor(productsbyvendor.data.data)
        setIsLoading(false)
    }


    const sendWA = (wanumb, vendorname, item) => {
        Linking.openURL(`whatsapp://send?text=Halo ${vendorname}, apakah ${item} masih tersedia ?&phone=${wanumb}`)
    }

    const callnumb = (phonenumb) => {
        Linking.openURL(`tel:${phonenumb}`)
    }

    return (
        <Animated.ScrollView
            //onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                { useNativeDriver: true },
            )}
            scrollEventThrottle={16}
        >
            {isLoading ? (
                <View>
                    <SkeletonPlaceholder>
                        <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
                            <View style={{ width: wp('100%'), height: 400, backgroundColor: 'red' }} />
                            <View style={{ alignItems: 'center', width: '100%' }}>
                                <View style={{ width: wp('90%'), height: 100, marginTop: 10, borderRadius:8 }} />
                                <View style={{ width: wp('90%'), height: 150, marginTop: 10 , borderRadius:8}} />
                                <View style={{ width: wp('90%'), height: 100, marginTop: 10 , borderRadius:8}} />
                                <View style={{ width: wp('90%'), height: 100, marginTop: 10 , borderRadius:8}} />
                            </View>
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
                                <View style={{ width: 120, height: 25, fontWeight: 'bold', marginLeft: 20 }} />
                                <View style={{ width: 90, height: 30, borderRadius: 7, marginTop: 5, marginLeft: 20, marginTop: 35 }} />
                            </View>
                        </View>
                        <View style={{ width: wp('100%'), height: 80, marginTop: 40 }}>

                        </View> */}
                    </SkeletonPlaceholder>
                </View>
            ) : (
                    <>
                        <StatusBar translucent backgroundColor='transparent' />
                        <View style={{ flex: 1, flexDirection: 'row', position: 'absolute', width: '100%', marginTop: 30, zIndex: 100, padding: 20 }}>
                            {/* <View> */}

                            <TouchableOpacity
                                style={{ backgroundColor: 'white', borderRadius: 70, width: 60, height: 60, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => navigation.goBack()}
                            >
                                <Icon2 name="arrow-left" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                        {product.map((data, index) =>
                            <View key={index}>
                                <View style={styles.wrapper}>
                                    <View style={styles.slide1} >
                                        <Animated.Image source={{ uri: `${productimagepath}/${data.image}` }} resizeMethod="resize" style={styles.imageparallax(scrollA)} />
                                    </View>
                                </View>
                                <View style={{ backgroundColor: 'white', paddingBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
                                    <NumberFormat
                                        value={data.price}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        renderText={formattedValue => <Text style={styles.price}>Rp {formattedValue}</Text>}
                                    />
                                    <Text style={styles.text}>{data.name}</Text>
                                    <Badge style={{ alignSelf: 'flex-start', backgroundColor: '#0984e3' }}>{data.category_name}</Badge>
                                    <View style={styles.divider}></View>
                                    <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                        <TouchableOpacity onPress={() => sendWA(vendor.wa, vendor.name, data.name)} style={{ backgroundColor: '#27ae60', padding: 10, borderRadius: 7, marginTop: 5, width: wp('44%'), flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><Icon name="logo-whatsapp" size={18} color="white" /><Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', marginLeft: 5 }}>WhatsApp</Text></TouchableOpacity>
                                        <TouchableOpacity onPress={() => callnumb(vendor.phone)} style={{ backgroundColor: '#0984e3', padding: 8, borderRadius: 7, marginTop: 5, width: wp('44%'), flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><Icon name="call" size={18} color="white" /><Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', marginLeft: 5 }}>Panggil</Text></TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.batas} />
                                <View style={{ padding: 20, backgroundColor: 'white' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Deskripsi Produk</Text>
                                    <Text style={{ marginTop: 10, fontSize: 12 }}>{data.description}</Text>
                                </View>
                                <View style={styles.batas} />
                                <View style={{ flex: 1, flexDirection: 'row', padding: 20, backgroundColor: 'white' }}>
                                    <Image source={{ uri: `${vendorlogopath}/${vendor.logo}` }} resizeMethod="resize" style={{ width: 65, height: 65, borderRadius: 50, backgroundColor: '#bdc3c7' }} />
                                    <View>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 20 }}>{vendor.name}</Text>
                                        <TouchableOpacity onPress={() => navigation.navigate('Vendordetail', { vendorId: vendor.id })} style={{ backgroundColor: '#27ae60', padding: 8, borderRadius: 7, marginTop: 5, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}><Icon2 name="storefront-outline" size={18} color="white" /><Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', marginLeft: 5 }}>Kunjungi Toko</Text></TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.batas} />
                                <View style={{ paddingTop: 20, backgroundColor: 'white' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 20, marginBottom: 20 }}>Lainnya di {vendor.name}</Text>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                        {productbyvendor.slice(0, 8).map((data, index) =>
                                            <TouchableOpacity key={index} style={styles.VendorItem} onPress={() => navigation.push('Detail', { productId: data.id, vendorId: data.vendor_id })}>
                                                <Image source={{ uri: `${productimagepath}/${data.image}` }} resizeMethod="resize" style={{ width: '100%', height: hp('15%'), alignSelf: 'center', borderTopRightRadius: 8, borderTopLeftRadius: 8, }} />
                                                <Text style={[{ fontFamily: 'MontserratAlternates-Regular', fontSize: 14, fontWeight: 'bold', marginRight: 8, marginLeft: 8 }]}>{data.name}</Text>
                                                <Badge style={{ alignSelf: 'flex-start', backgroundColor: '#0984e3', marginRight: 8, marginLeft: 8 }}>{data.category_name}</Badge>
                                                <NumberFormat
                                                    value={data.price}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    renderText={formattedValue => <Text style={[{ fontFamily: 'MontserratAlternates-Regular', fontSize: 14, fontWeight: 'bold', marginRight: 8, marginLeft: 8 }]}>Rp {formattedValue}</Text>}
                                                />
                                            </TouchableOpacity>
                                        )}
                                    </ScrollView>
                                </View>
                            </View>
                        )}
                    </>
                )}

            {/* </Swiper> */}
        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: hp('50%')
    },
    imageparallax: scrollA => ({
        width: '100%',
        height: image_H,
        //top: scrollA,
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-image_H, 0, image_H, image_H + 1],
                    outputRange: [-image_H / 2, 0, image_H * 0.75, image_H * 0.75],
                }),
            },
        ],
    }),
    batas: {
        height: 10,
        backgroundColor: '#f1f2f6'
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#9DD6EB'
    },
    text: {
        color: 'black',
        fontSize: 20,
        marginBottom: 5
        //fontWeight: 'bold'
    },
    price: {
        marginTop: 10,
        color: 'black',
        fontSize: 23,
        fontWeight: 'bold'
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
        borderTopWidth: 0.5,
        borderColor: 'black',
    },
    VendorItem: {
        flex: 1,
        alignContent: 'center',
        width: wp('35%'),
        backgroundColor: 'white',
        borderRadius: 8,
        marginRight: 5,
        marginLeft: 5,
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
        marginBottom: 20
    },
})

export default DetailScreen;