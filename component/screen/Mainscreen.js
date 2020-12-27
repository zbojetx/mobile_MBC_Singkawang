import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, StatusBar, BackHandler, Alert } from 'react-native';
import { Searchbar, Badge } from 'react-native-paper';
import { get_all, get_all_by_id } from './../API/api';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import NumberFormat from 'react-number-format';
import Icon from 'react-native-vector-icons/Ionicons';
import RBSheet from "react-native-raw-bottom-sheet";
import Animated from 'react-native-reanimated';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import HTML from 'react-native-render-html';

const image_H = 400

const ListMenu = [
    {
        name: "Tentang Kami",
        icon: "easel-outline",
        routename: "about"
    },
    {
        name: "Struktur Organisasi",
        icon: "color-filter-outline",
        routename: "about"
    },
    {
        name: "Visi Misi",
        icon: "list-circle-outline",
        routename: "about"
    }
]

const Main = ({ navigation }) => {
    const scrollA = useRef(new Animated.Value(0)).current
    const [isLoading, setIsLoading] = useState(true)
    const [categoryall, setCategoryAll] = useState([])
    const [vendorall, setVendorAll] = useState([])
    const [vendorlogopath, setVendorLogoPath] = useState('')
    const [productall, setProductAll] = useState([])
    const [productpathimage, setProductPathImage] = useState('')
    const [aboutus, setAboutUs] = useState('')
    const [aboutpar, setAboutPar] = useState('')
    const [searchparam, setSearchParam] = useState('')
    const [slider, setSlider] = useState([])
    const [sliderimagepath, setSliderImagePath] = useState('')
    const [featuredproduct, setFeaturedProduct] = useState([])
    const [popularproduct, setPopularProduct] = useState([])
    const [xtranslucent, setXTranslucent] = useState(true)

    const refRBSheet = useRef();
    const refRBSheet2 = useRef();
    const refRBSheet3 = useRef();

    useEffect(() => {
        firstrun()

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [])

    const backAction = () => {
        if (navigation.isFocused()) {
            Alert.alert("Keluar", "Keluar Aplikasi?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        }
    };

    const firstrun = async () => {
        getAllCategory()
        getFeaturedProduct()
        getPopularProduct()
        getAboutUs()
        getAllVendor()
        getAllProduct()
        getAllSlider()
    }

    const getAllCategory = async () => {
        const data = await get_all('/category')
        setCategoryAll(data.data)
    }

    const getAllVendor = async () => {
        const data = await get_all('/vendor')
        setVendorAll(data.data)
        setVendorLogoPath(data.meta.logo_path)
    }

    const getAboutUs = async () => {
        const data = await get_all('/about')
        setAboutUs(data.data.description)
    }

    const getAllProduct = async () => {
        const data = await get_all('/product')
        setProductAll(data.data)
        setProductPathImage(data.product_image_url)
    }

    const getFeaturedProduct = async () => {
        const data = await get_all('/featured/product/10')
        setFeaturedProduct(data.data)
        setProductPathImage(data.product_image_url)
    }

    const getPopularProduct = async () => {
        const data = await get_all('/populer/product/10')
        setPopularProduct(data.data)
        setProductPathImage(data.product_image_url)
    }


    const getAllSlider = async () => {
        const data = await get_all('/slider')
        setSlider(data.data)
        setSliderImagePath(data.slider_path)
        console.log(data.slider_path)
        setIsLoading(false)
    }

    const About = async (par) => {
        setAboutPar(par)
        refRBSheet.current.open()
    }

    const onChangeSearch = async (value) => {
        setSearchParam(value)
    }

    const searchproduct = async (value) => {
        navigation.navigate('Product', { categoryId: 0, categoryName: searchparam, params: 'search' })
    }

    const Menu = () => {
        return (
            <View style={{ padding: 25 }}>
                {ListMenu.map((data, index) =>
                    <TouchableOpacity key={index} style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Icon name={data.icon} size={25} /><Text style={{ color: 'black', fontSize: 16, marginLeft: 10 }}>{data.name}</Text>
                    </TouchableOpacity>
                )}
            </View>
        )
    }

    const handleScroll = (event) => {
        let y = event.nativeEvent.contentOffset.y
        console.log(event.nativeEvent.contentOffset.y);
        if (y > 50) {
            setXTranslucent(false)
        } else {
            setXTranslucent(true)
        }
    }


    return (
        <Animated.ScrollView
            style={style.Wrapper}
            onScroll={(event) => {
                Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                    { useNativeDriver: true })
                let y = event.nativeEvent.contentOffset.y
                console.log(event.nativeEvent.contentOffset.y);
                if (y > 50) {
                    setXTranslucent(false)
                } else {
                    setXTranslucent(true)
                }

            }

            }

            scrollEventThrottle={16}
        >
            <StatusBar backgroundColor='white' />
            {isLoading ? (
                <View>
                    <SkeletonPlaceholder>
                        <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
                            <View style={{ width: wp('100%'), height: 400, backgroundColor: 'red' }} />
                            <View>
                                <View style={{ width: wp('100%'), height: 100, marginTop: 10 }} />
                                <View style={{ width: wp('100%'), height: 150, marginTop: 10 }} />
                                <View style={{ width: wp('100%'), height: 100, marginTop: 10 }} />
                                <View style={{ width: wp('100%'), height: 100, marginTop: 10 }} />
                            </View>
                        </View>
                    </SkeletonPlaceholder>
                </View>
            ) : (
                    <>

                        {/* Search Bar */}
                        <View style={{ flex: 1, flexDirection: 'row', width: '100%', marginTop: 30, zIndex: 100, padding: 20 }}>
                            {/* <View> */}

                            <Searchbar
                                placeholder="Cari Produk"
                                onChangeText={onChangeSearch}
                                style={{ backgroundColor: 'white', borderRadius: 8, width: '100%' }}
                                onSubmitEditing={searchproduct}
                            />
                        </View>

                        <RBSheet
                            ref={refRBSheet}
                            closeOnDragDown={true}
                            closeOnPressMask={true}
                            height={500}
                            openDuration={250}
                            customStyles={{
                                wrapper: {
                                    backgroundColor: "transparent",
                                    borderRadius: 10
                                },
                                container: {
                                    borderRadius: 10,
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2.22,
                                    elevation: 10,
                                },
                                draggableIcon: {
                                    backgroundColor: "#000"
                                }
                            }}
                        >
                            <ScrollView style={{ flex: 1, padding: 20 }}>
                                <Image source={require('./../assets/img/logo.jpg')} style={{ width: wp('50%'), height: hp('10%'), marginBottom: 20, alignSelf: 'center' }} />
                                <HTML html={aboutus} />
                            </ScrollView>

                        </RBSheet>

                        <RBSheet
                            ref={refRBSheet2}
                            closeOnDragDown={true}
                            closeOnPressMask={true}
                            height={200}
                            openDuration={250}
                            customStyles={{
                                wrapper: {
                                    backgroundColor: "transparent",
                                    borderRadius: 10
                                },
                                container: {
                                    borderRadius: 10,
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2.22,
                                    elevation: 10,
                                },
                                draggableIcon: {
                                    backgroundColor: "#000"
                                }
                            }}
                        >
                            <View style={{ flex: 1, flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('./../assets/img/location.png')} style={{ width: 50, height: 50 }} />
                                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 14, fontWeight: 'bold', marginLeft: 20 }}>Jalan Firdaus H.Rais No. 38 Singkawang 79123</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('./../assets/img/mail.png')} style={{ width: 50, height: 50 }} />
                                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 14, fontWeight: 'bold', marginLeft: 20 }}>daginkopukm@singkawangkota.go.id</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('./../assets/img/phone.png')} style={{ width: 50, height: 50 }} />
                                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 14, fontWeight: 'bold', marginLeft: 20 }}>(0562)631425</Text>
                            </View>
                        </RBSheet>

                        <RBSheet
                            ref={refRBSheet3}
                            closeOnDragDown={true}
                            closeOnPressMask={true}
                            height={300}
                            openDuration={250}
                            customStyles={{
                                wrapper: {
                                    backgroundColor: "transparent",

                                },
                                container: {
                                    borderRadius: 10,
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2.22,
                                    elevation: 10,
                                },
                                draggableIcon: {
                                    backgroundColor: "#000"
                                }
                            }}
                        >
                            <ScrollView style={{ flex: 1, padding: 20 }}>
                                <Image source={require('./../assets/img/st.jpg')} style={{ width: wp('100%'), height: hp('30%'), marginBottom: 20, alignSelf: 'center' }} />
                            </ScrollView>
                        </RBSheet>

                        {/* Slide Show */}
                        <Animated.View style={style.imageparallax(scrollA)}>
                            <Swiper style={styles.wrapper}
                                //autoplay
                                dot={
                                    <View
                                        style={{
                                            backgroundColor: 'rgba(0,0,0,.2)',
                                            width: 5,
                                            height: 5,
                                            borderRadius: 2,
                                            marginLeft: 3,
                                            marginRight: 3,
                                            marginTop: 3,
                                            marginBottom: 3,
                                            alignSelf: 'flex-start'
                                        }}
                                    />
                                }
                                activeDot={
                                    <View
                                        style={{
                                            backgroundColor: '#f0932b',
                                            width: 10,
                                            height: 5,
                                            borderRadius: 4,
                                            marginLeft: 3,
                                            marginRight: 3,
                                            marginTop: 3,
                                            marginBottom: 3
                                        }}
                                    />
                                } >
                                {slider.map((data, index) =>
                                    <View style={styles.slide1} key={index}>
                                        <Image source={{ uri: `${sliderimagepath}/${data.image}` }} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
                                    </View>
                                )}
                            </Swiper>
                        </Animated.View>



                        <View style={{ backgroundColor: 'white' }}>
                            <View style={[style.CategoryTitle, { paddingLeft: 20, paddingRight: 20, marginTop: 20 }]}>
                                <Text style={[style.TextStyle, { fontSize: 16 }]}>Kategori</Text>
                                <Text onPress={() => navigation.navigate('Category')} style={[style.TextStyle, { color: '#f0932b' }]}>Lihat semua</Text>
                            </View>
                            {/* Kategori */}
                            <View style={style.CategoryItem}>
                                {categoryall.slice(0, 8).map((data, index) =>
                                    <TouchableOpacity key={index} onPress={() => navigation.navigate('Product', { categoryId: data.id, categoryName: data.name, params: 'category' })} >
                                        <Image source={{ uri: data.icon }} style={{ width: wp('8%'), height: hp('4%'), alignSelf: 'center' }} />
                                        <Text style={[{ alignSelf: 'center', fontSize: 10, marginTop: 5, textAlign: 'center' }]}>{data.name}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>

                        {/* Produk Unggulan */}
                        <View style={style.ProductPopulerWrapper}>
                            <View style={[style.CategoryTitle, { paddingLeft: 20, paddingRight: 20, marginBottom: 15 }]}>
                                <Text style={[style.TextStyle, { fontSize: 16, color: 'white' }]}>Produk Unggulan</Text>
                                <Text onPress={() => navigation.navigate('Productunggulan')} style={[style.TextStyle, { color: 'white' }]}>Lihat Semua</Text>
                            </View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                {featuredproduct.map((data, index) =>
                                    <TouchableOpacity key={index} onPress={() => navigation.navigate('Detail', { productId: data.id, vendorId: data.vendor_id })} style={style.ProductPopulerItem}>
                                        <Image source={{ uri: `${productpathimage}/${data.image}` }} style={{ width: '100%', height: hp('18%'), alignSelf: 'center', borderTopRightRadius: 8, borderTopLeftRadius: 8 }} />
                                        <Text style={[{ fontFamily: 'MontserratAlternates-Regular', fontSize: 13, fontWeight: 'bold', marginTop: 10, marginLeft: 10, marginRight: 10, }]}>{data.name}</Text>
                                        <Badge style={[{ fontSize: 10, fontWeight: 'bold', color: 'white', alignSelf: 'flex-start', marginLeft: 10, marginRight: 10, }]}>{data.vendor_name}</Badge>
                                        <NumberFormat
                                            value={data.price}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            renderText={formattedValue => <Text style={{ marginLeft: 10, marginRight: 10, marginTop: 5, fontWeight: 'bold', fontSize: 16 }}>Rp {formattedValue}</Text>} />
                                    </TouchableOpacity>
                                )}
                            </ScrollView>
                        </View>


                        {/* Vendor */}
                        <View style={style.VendorWrapper}>
                            <View style={[style.CategoryTitle, { paddingLeft: 20, paddingRight: 20, marginBottom: 10 }]}>
                                <Text style={[style.TextStyle, { fontSize: 16, color: 'black' }]}>UKM</Text>
                                <Text onPress={() => navigation.navigate('Vendor')} style={style.VendorItem} style={[style.TextStyle, { color: 'black' }]}>Lihat Semua</Text>
                            </View>
                            {/* Vendor */}
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                {vendorall.slice(0, 9).map((data, index) =>
                                    <View>
                                        <TouchableOpacity key={index} onPress={() => navigation.navigate('Vendordetail', { vendorId: data.id })} style={style.VendorItem}>
                                            <View >
                                                <Image source={{ uri: `${vendorlogopath}/${data.logo}` }} style={{ width: 120, height: 120, alignSelf: 'center', borderRadius: 8 }} />
                                            </View>

                                        </TouchableOpacity>
                                        <Text style={{ fontFamily: 'MontserratAlternates-Regular', fontSize: 12, fontWeight: 'bold', marginLeft: 8, marginRight: 8, marginTop: 10, alignSelf: 'center' }}>{data.name}</Text>
                                    </View>
                                )}
                            </ScrollView>
                        </View>
                        <View style={style.batas} />


                        {/* Popular Product*/}
                        <View style={style.ProductPopulerWrapper}>
                            <View style={[style.CategoryTitle, { paddingLeft: 20, paddingRight: 20, marginBottom: 15 }]}>
                                <Text style={[style.TextStyle, { fontSize: 16, color: 'white' }]}>Produk Populer</Text>

                            </View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                {popularproduct.map((data, index) =>
                                    <TouchableOpacity key={index} onPress={() => navigation.navigate('Detail', { productId: data.id, vendorId: data.vendor_id })} style={style.ProductPopulerItem}>
                                        <Image source={{ uri: `${productpathimage}/${data.image}` }} style={{ width: '100%', height: hp('18%'), alignSelf: 'center', borderTopRightRadius: 8, borderTopLeftRadius: 8 }} />
                                        <Text style={[{ fontFamily: 'MontserratAlternates-Regular', fontSize: 13, fontWeight: 'bold', marginTop: 10, marginLeft: 10, marginRight: 10, }]}>{data.name}</Text>
                                        <Badge style={[{ fontSize: 10, fontWeight: 'bold', color: 'white', alignSelf: 'flex-start', marginLeft: 10, marginRight: 10, }]}>{data.vendor_name}</Badge>
                                        <NumberFormat
                                            value={data.price}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            renderText={formattedValue => <Text style={{ marginLeft: 10, marginRight: 10, marginTop: 5, fontWeight: 'bold', fontSize: 16 }}>Rp {formattedValue}</Text>} />
                                    </TouchableOpacity>
                                )}
                            </ScrollView>
                        </View>
                        <View style={style.batas} />


                        {/* Produk all*/}
                        <View style={{ backgroundColor: 'white', padding: 20 }}>
                            <View style={style.CategoryTitle}>
                                <Text style={[style.TextStyle, { fontSize: 16 }]}>Produk Lainnya</Text>
                                <Text onPress={() => navigation.navigate('Product', { categoryId: 0, categoryName: "Semua Kategori", params: 'all' })} style={[style.TextStyle, { color: '#f0932b' }]}>Lihat Semua</Text>
                            </View>
                            {/* Vendor */}
                            <View style={style.ProductWrapper}>
                                {productall.slice(0, 10).map((data, index) =>
                                    <TouchableOpacity key={index} onPress={() => navigation.navigate('Detail', { productId: data.id, vendorId: data.vendor_id })} style={style.ProductItem}>
                                        <Image source={{ uri: `${productpathimage}/${data.image}` }} style={{ width: '100%', height: hp('18%'), alignSelf: 'center', borderTopRightRadius: 8, borderTopLeftRadius: 8 }} />
                                        <Text style={[{ fontFamily: 'MontserratAlternates-Regular', fontSize: 13, fontWeight: 'bold', marginTop: 10, marginLeft: 10, marginRight: 10, }]}>{data.name}</Text>
                                        <Badge style={[{ fontSize: 10, fontWeight: 'bold', color: 'white', alignSelf: 'flex-start', marginLeft: 10, marginRight: 10, }]}>{data.vendor_name}</Badge>
                                        <NumberFormat
                                            value={data.price}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            renderText={formattedValue => <Text style={{ marginLeft: 10, marginRight: 10, marginTop: 5, fontWeight: 'bold', fontSize: 16 }}>Rp {formattedValue}</Text>} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                        {/* <View style={style.VendorWrapper}> */}
                        {/* About Us*/}
                        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => About('about')} style={style.ProfilItem}>
                                        <View >
                                            <Image source={require('./../assets/img/tentangkamix.jpg')} style={{ width: '100%', height: 120, alignSelf: 'center', borderRadius: 8 }} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => refRBSheet2.current.open()} style={style.ProfilItem}>
                                        <View >
                                            <Image source={require('./../assets/img/kontakkamix.jpg')} style={{ width: '100%', height: 120, alignSelf: 'center', borderRadius: 8 }} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => refRBSheet3.current.open()} style={style.ProfilItem}>
                                        <View >
                                            <Image source={require('./../assets/img/strukturorganisasix.jpg')} style={{ width: '100%', height: 120, alignSelf: 'center', borderRadius: 8 }} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </ScrollView> */}
                        {/* </View> */}
                    </>
                )}

        </Animated.ScrollView>
    )
}

const style = StyleSheet.create({
    Wrapper: {
        //padding: 20,
        backgroundColor: 'white'
    },
    imageparallax: scrollA => ({
        width: '100%',
        height: hp('30%'),
        //top: scrollA,
        // transform: [
        //     {
        //         translateY: scrollA.interpolate({
        //             inputRange: [-image_H, 0, image_H, image_H + 1],
        //             outputRange: [-image_H / 2, 0, image_H * 0.75, image_H * 0.75],
        //         }),
        //     },
        // ],
    }),
    batas: {
        height: 20,
        backgroundColor: '#f1f2f6'
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
    },
    CategoryItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: 35
    },
    VendorWrapper: {
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#fff',
        //marginBottom: 20,
    },
    ProfilItem: {
        flex: 1,
        alignContent: 'center',
        width: 200,
        height: 120,
        backgroundColor: 'white',
        borderRadius: 8,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 10,
        paddingBottom: 20,
    },
    VendorItem: {
        flex: 1,
        alignContent: 'center',
        width: 120,
        height: 120,
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
    },
    ProductPopulerWrapper: {
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#ff9f43',
        //marginTop: 20,
        marginBottom: 20,
    },
    ProductPopulerItem: {
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
        // height: hp('50%')
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