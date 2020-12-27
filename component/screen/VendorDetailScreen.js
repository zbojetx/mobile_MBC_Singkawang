import React, { useEffect, useState } from 'react';
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
import NumberFormat from 'react-number-format';
import { Searchbar, Badge, Button } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const VendorDetailScreen = ({ navigation, route }) => {
    const { productId } = route.params
    const [vendorid, setVendorId] = useState(route.params.vendorId)
    const [vendor, setVendor] = useState('')
    const [vendorlogopath, setVendorLogoPath] = useState('')
    const [product, setProduct] = useState([])
    const [productbyvendor, setProductByVendor] = useState([])
    const [productimagepath, setProductImagePath] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getvendor(vendorid)
        getproductbyvendor(vendorid)
    }, [])

    // const getproduct = async (id) => {
    //     const url = '/product'
    //     const productdetail = await get_all_by_id(url, id)
    //     setProductImagePath(productdetail.product_image_url)
    //     setProduct(productdetail.data)
    // }

    const getvendor = async (id) => {
        const url = '/vendor'
        const vendordetail = await get_all_by_id(url, id)
        setVendorLogoPath(vendordetail.data.meta.logo_path)
        setVendor(vendordetail.data.data)
    }

    const getproductbyvendor = async (id) => {
        const url = '/product/vendor'
        const productsbyvendor = await get_all_by_id(url, id)
        setProductImagePath(productsbyvendor.data.product_image_url)
        console.log("AA")
        console.log(productsbyvendor.data.product_image_url)
        setProductByVendor(productsbyvendor.data.data)
        setIsLoading(false)
    }

    const sendWA = (wanumb, name) => {
        Linking.openURL(`whatsapp://send?text=Halo ${name}&phone=${wanumb}`)
    }

    const callnumb = (phonenumb) => {
        Linking.openURL(`tel:${phonenumb}`)
    }

    return (
        <ScrollView>
            {isLoading ? (
                <View>
                    <SkeletonPlaceholder>
                        <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
                            <View style={{ width: wp('100%'), height: 200, backgroundColor: 'red' }} />
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
                    <View>
                        <View style={{ flex: 1, flexDirection: 'row', padding: 20, backgroundColor: 'white' }}>
                            <Image source={{ uri: `${vendorlogopath}/${vendor.logo}` }} style={{ width: 80, height: 80, borderRadius: 50, backgroundColor: '#bdc3c7' }} />
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 20 }}>{vendor.name}</Text>
                                <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 20, marginTop: 5 }}>
                                    <Icon name="person-outline" size={15} /><Text style={{ fontSize: 13, marginLeft: 5, fontWeight: 'bold' }}>{vendor.owner}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 20, marginTop: 5, paddingRight: 20 }}>
                                    <Icon name="location-outline" size={15} /><Text style={{ flexWrap: 'wrap', fontSize: 13, marginLeft: 5, fontWeight: 'bold', width: wp('60%') }}>{vendor.address}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, paddingBottom: 20, marginBottom: 20, backgroundColor: 'white' }}>
                            <TouchableOpacity onPress={() => sendWA(vendor.wa, vendor.name)} style={{ backgroundColor: '#27ae60', padding: 10, borderRadius: 7, marginTop: 5, width: wp('44%'), flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><Icon name="logo-whatsapp" size={18} color="white" /><Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', marginLeft: 5 }}>WhatsApp</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => callnumb(vendor.phone)} style={{ backgroundColor: '#0984e3', padding: 8, borderRadius: 7, marginTop: 5, width: wp('44%'), flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><Icon name="call" size={18} color="white" /><Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', marginLeft: 5 }}>Panggil</Text></TouchableOpacity>
                        </View>

                        <View style={{ backgroundColor: 'white', padding: 20 }}>
                            <View style={style.CategoryTitle}>
                                <Text style={[style.TextStyle, { fontSize: 16 }]}> Semua Produk</Text>
                            </View>
                            {/* Vendor */}
                            <View style={style.ProductWrapper}>
                                {productbyvendor.map((data, index) =>
                                    <TouchableOpacity key={index} onPress={() => navigation.navigate('Detail', { productId: data.id, vendorId: data.vendor_id })} style={style.ProductItem}>
                                        <Image source={{ uri: `${productimagepath}/${data.image}` }} resizeMethod="resize" style={{ width: '100%', height: hp('18%'), alignSelf: 'center', borderTopRightRadius: 8, borderTopLeftRadius: 8 }} />
                                        <Text style={[{ fontFamily: 'MontserratAlternates-Regular', fontSize: 13, fontWeight: 'bold', marginTop: 10, marginLeft: 10, marginRight: 10, }]}>{data.name}</Text>
                                        <Badge style={[{ fontSize: 10, fontWeight: 'bold', color: 'white', alignSelf: 'flex-start', marginLeft: 10, marginRight: 10, backgroundColor: '#0984e3' }]}>{data.category_name}</Badge>

                                        <NumberFormat
                                            value={data.price}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            renderText={formattedValue => <Text style={{ marginLeft: 10, marginRight: 10, marginTop: 5, fontWeight: 'bold', fontSize: 16 }}>Rp {formattedValue}</Text>} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                )}

        </ScrollView>
    )
}

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
        borderTopWidth: 0.5,
        borderColor: 'black',
    },
    VendorItem: {
        flex: 1,
        alignContent: 'center',
        height: hp('20%'),
        width: wp('28%'),
        backgroundColor: 'white',
        borderRadius: 8,
        marginRight: 5,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
})

const style = StyleSheet.create({
    Wrapper: {
        //padding: 20,
        //backgroundColor: 'white'
    },
    TextStyle: {
        fontFamily: 'MontserratAlternates-Regular',
        fontSize: 12,
        fontWeight: 'bold'
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
        height: hp('20%'),
        width: wp('28%'),
        backgroundColor: 'white',
        borderRadius: 8,
        marginRight: 5,
        padding: 5,
        marginTop: 10
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
        paddingBottom: 20,
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
    }

})

export default VendorDetailScreen;