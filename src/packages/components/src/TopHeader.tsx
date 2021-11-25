import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View, TouchableOpacity,
    Text, Button,
    StatusBar, Dimensions, Image
} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import Scale, { verticalScale } from '../../framework/src/utils/Scale';
import COLOR_CONST, { FONTS } from '../../blocks/studio-store-ecommerce-theme/src/AppFonts';
const themeJson = require('../../blocks/studio-store-ecommerce-theme/src/theme.json');


const { width, height } = Dimensions.get("window")

const TopHeader = (props: any) => {
    const {
        navigation,
        headerLeftIconName,
        headerLeftIconStyle,
        headerRightIcons = [],
        headerRight,
        headerTitle = "",
        headerTitleStyle,
        headerStyle,
        headerTitleViewStyle,
        onPressLeft
    } = props
    return (
        <View style={[{ height: verticalScale(60), flexDirection: "row", backgroundColor: themeJson.attributes.header_color, justifyContent: "center", alignItems: "center", shadowOffset: { height: 0, width: 0 }, shadowOpacity: 0.2, elevation: 2 },
            headerStyle]}>
            {   
                headerLeftIconName && headerLeftIconName != "" ?
                    <TouchableOpacity
                        onPress={onPressLeft}
                        style={[{ width: Scale(50), height: "100%", justifyContent: "center", alignItems: "center" }]}
                    >
                        <Image source={headerLeftIconName} style={[styles.leftImageStyle, headerLeftIconStyle]} />
                    </TouchableOpacity> :
                    <View style={{ height: "100%", width: Scale(60) }} />
            }
            {headerTitle === "" ?
                <View style={{
                    width: headerLeftIconName && headerLeftIconName != "" ?
                        headerRightIcons.length === 0 ? "85%" : Scale(235)
                        :
                        headerRightIcons.length === 0 ? Scale(375) : Scale(235),
                    height: "100%",
                    // justifyContent: "center"
                }} />
                :
                <View style={[{
                    width: Scale(235),
                    // marginTop:verticalScale(18),
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                }, headerTitleViewStyle]}>
                    <Text style={[{
                        fontSize: Scale(15),
                        lineHeight: Scale(18),
                        marginTop: verticalScale(18),
                        fontFamily: FONTS.GTWalsheimProRegular,
                    }, headerTitleStyle]}
                    >
                        {headerTitle}
                    </Text>
                </View>
            }
            {headerRightIcons && headerRightIcons.length > 0 ?
                <View style={{
                    width: Scale(80),
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    paddingRight: Scale(10),
                    justifyContent: 'flex-end'

                }}>
                    {headerRightIcons.map((item: any, index: number) => {

                        return (
                            <TouchableOpacity style={{ marginTop: verticalScale(18), }} onPress={item.onPress}>
                                <Image source={item.src} style={[styles.rightImageStyle, item.style]} />
                                {item?.cartHasProductFlag && (
                                    <View
                                        style={{
                                            height: Scale(8),
                                            width: Scale(8),
                                            borderRadius: Scale(4),
                                            backgroundColor: 'red',
                                            borderColor: 'white',
                                            borderWidth: 0.9,
                                            position: 'absolute',
                                            top: Scale(0),
                                            end: Scale(5),
                                        }}
                                    />
                                )}
                            </TouchableOpacity>
                        )
                    })}
                </View> : <View style={{ width: Scale(80) }} />
            }
            {headerRight ?
                <View style={{
                    width: Scale(100),
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    paddingRight: Scale(20),

                }}>
                    {headerRight}
                </View> : null
            }
        </View>
    )

};

const styles = StyleSheet.create({
    leftImageStyle: {
        width: Scale(20),
        height: verticalScale(18),
        marginTop: verticalScale(18),
        resizeMode: "contain"
    },
    rightImageStyle: {
        width: Scale(20),
        height: verticalScale(18),
        marginRight: Scale(8),
        resizeMode: "contain"
    }
});

export default TopHeader;
