import React from "react";
// Customizable Area Start
import { FlatList, Image, Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import ReadMore from 'react-native-read-more-text';
import FocusAwareStatusBar from '../../../components/src/FocusAwareStatusBar';
import { ProductGrid } from '../../../components/src/homeComponents/ProductGrid/ProductGrid';
import TopHeader from "../../../components/src/TopHeader";
import COLOR_CONST from '../../studio-store-ecommerce-theme/src/AppFonts';
import {
    CART_BLACK_ICON, SHARE_ICON, heartWishlist, redHeart,
    SELECTED_STAR, UNSELECTED_STAR, STOCK_TICK, BACK_ICON, SOLD_OUT_ICON,
} from '../../studio-store-ecommerce-theme/src/AppAssets/appassets';
import scale, { verticalScale } from '../../../framework/src/utils/Scale';
// Customizable Area End
import ProductDescriptionController, { Props } from "./ProductDescriptionController";
import styles from './ProductDescriptionStyle';
import ApplicationLoader from "../../../components/src/AppLoader/AppLoader";
import CustomErrorModal from "../../../components/src/CustomErrorModal/CustomErrorModal";
const themeJson = require('../../studio-store-ecommerce-theme/src/theme.json');

export const configJSON = require("./config");

export default class ProductDescription extends ProductDescriptionController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    // Customizable Area End
    renderToolItem = (item: any, attribute: any, isFromColor: boolean) => {
        const { selectedAttributes } = this.state;
        const isSelected = selectedAttributes[attribute] && selectedAttributes[attribute].id === item.id ? true : false;
        if (attribute.toUpperCase() == "COLOR" || attribute.toUpperCase() == "COLORS")
            return (
                <TouchableOpacity
                    onPress={() => this.onPressTool(item, attribute)}
                    style={[styles.toolItemSizeCell, {
                        backgroundColor: isSelected
                            ? COLOR_CONST.charcoalGrey
                            : COLOR_CONST.white,
                        opacity: 0.70
                    }]}
                >
                    <Text style={[styles.labelText, {
                        color: isSelected
                            ? COLOR_CONST.white
                            : COLOR_CONST.charcoalGrey
                    }]}>{item.name}</Text>
                </TouchableOpacity>
            )
        return (
            <>
                {item?.name &&
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => this.onPressTool(item, attribute)}
                        style={[styles.toolItemSizeCell, {
                            backgroundColor: isSelected
                                ? COLOR_CONST.charcoalGrey
                                : COLOR_CONST.white,
                            opacity: 0.70
                        }]}
                    >
                        {!isFromColor && <Text style={[styles.labelText, {
                            color: !isSelected ? COLOR_CONST.charcoalGrey :
                                COLOR_CONST.white
                        }]}>{item.name}</Text>}
                    </TouchableOpacity>
                }
            </>
        )
    }
    renderToolListSelector = (attributeData: any, attribute: any, isFromColor: boolean) => {
        const distinctData = Array.from(new Set(attributeData.map((s:any) => s.id))).map(id => {
            return {
                id: id,
                name: attributeData.find((s:any) => s.id === id).name
            }
        })
        return (
            <View style={styles.listSelector}>
                <FlatList
                    horizontal
                    extraData={this.state}
                    data={distinctData}
                    renderItem={({ item, index }) => this.renderToolItem(item, attribute, isFromColor)}
                />
            </View>
        )
    }
    renderSelectorTools = () => {
        const product_attributes = this.state.productData?.attributes?.product_attributes[0];
        const isItemAvailable = this.checkSelectedInAvailable();

        if (product_attributes) {

            const attributes = Object.keys(product_attributes);
            attributes.sort();
            return (
                <View style={styles.selectorToolContainer}>
                    {attributes.map((attribute, i) => {
                        const attributesPresent = product_attributes[attribute].length > 0;
                        return (
                            <>
                                {attributesPresent && <Text key={i} style={styles.colorText}>{attribute}</Text>}
                                {attributesPresent && this.renderToolListSelector(
                                    product_attributes[attribute],
                                    attribute,
                                    attribute === "color" ? true : false
                                )}
                            </>
                        )
                    }
                    )}
                    <View style={styles.selectorToolMessageContainer}>
                        {!isItemAvailable && (<Text style={styles.selectorToolMessage}>*This combination is not available</Text>)}
                    </View>
                </View>
            )
        } else {
            return <View />
        }
    }



    renderVarientImageItems = (item: any, index: number) => {
        return (
            <>
                {item?.attributes && <TouchableOpacity
                    style={styles.variantCell}
                    onPress={() => {
                        this.setState({ selectedImage: item?.attributes?.url });
                    }}

                >
                    <Image source={{ uri: item?.attributes?.url || '' }} style={styles.variantImage} />
                </TouchableOpacity>}
            </>
        );
    };


    renderReviewCell = (item: any, index: number) => {
        return (
            <View style={styles.reviewCell}>
                <View style={styles.nameRow}>
                    <Text style={styles.reviewName}>{item.user_name}</Text>
                    <Text style={styles.dateText}>{item.review_date}</Text>
                </View>
                <View style={styles.starListContainer}>
                    {this.state.ratingList.map((starItem: any, index: number) => {
                        return (
                            <TouchableOpacity onPress={() => { }}>
                                <Image source={index < item.rating ? SELECTED_STAR : UNSELECTED_STAR} style={styles.listStar} />
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <Text style={styles.reviewText}>{item.comment}</Text>
                <View style={styles.listHorizontalLine} />
            </View>
        )
    }

    renderReviewList = () => {
        if (!this.state.productData?.attributes?.reviews)
            return;
        if (this.state.productData?.attributes?.reviews.length === 0)
            return;
        let sliceLength = 0;
        if (this.state.productData?.attributes?.reviews.length <= 3)
            sliceLength = this.state.productData?.attributes.reviews.length;
        else
            sliceLength = 3;
        return (
            <View style={styles.reviewListContainer}>
                <FlatList
                    data={this.state.productData?.attributes.reviews.slice(0, sliceLength)}
                    extraData={this.state}
                    renderItem={({ item, index }: any) => this.renderReviewCell(item.attributes, index)}
                />
                {(this.state.productData?.attributes.reviews.length > 3) && <Text onPress={() => this.props.navigation.navigate('ReviewList', { productData: this.state.productData })} style={styles.allTen}>All {this.state.productData.attributes.reviews.length} Reviews</Text>}
            </View>
        )
    }

    renderProductReviewView = () => {
        if (!this.state.productData?.attributes?.average_rating)
            return;
        let ratingNo = (Math.round(this.state.productData?.attributes?.average_rating * 100) / 100).toFixed(1);
        return (
            <View style={styles.reviewContainer}>
                <View style={styles.productRow}>
                    <Text style={styles.leftHeading}>PRODUCT RATING</Text>
                    <Text style={styles.rightHeading}>Product Rating</Text>
                </View>
                <View style={styles.ratingContainer}>
                    <View style={styles.leftView}>
                        <Text style={styles.biggerRatingText}>{String(ratingNo) === '5.0' ? 5 : ratingNo} / 5</Text>
                        <View style={styles.starContainer}>
                            {this.state.ratingList.map((item: any, index: number) => {
                                return (
                                    <TouchableOpacity onPress={() => { }}>
                                        <Image source={this.getStarImage(index, this.state.productData?.attributes?.average_rating)} style={styles.star} />
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        {this.state.productData?.attributes?.reviews && <Text style={styles.basedText}>{`Based on ${this.state.productData?.attributes?.reviews.length} Ratings\n& Reviews`}</Text>}
                    </View>
                    <View style={styles.verticalLine} />
                    <View style={styles.rightView}>
                        <View style={styles.starRow}>
                            <Text style={styles.no}>5</Text>
                            <Image source={UNSELECTED_STAR} style={styles.innerStar} />
                            <View style={styles.progressContainer}>
                                <View style={styles.filled1} />
                                <View style={styles.unfilled1} />
                            </View>
                        </View>
                        <View style={styles.starRow}>
                            <Text style={styles.no}>4</Text>
                            <Image source={UNSELECTED_STAR} style={styles.innerStar} />
                            <View style={styles.progressContainer}>
                                <View style={styles.filled2} />
                                <View style={styles.unfilled2} />
                            </View>
                        </View>
                        <View style={styles.starRow}>
                            <Text style={styles.no}>3</Text>
                            <Image source={UNSELECTED_STAR} style={styles.innerStar} />
                            <View style={styles.progressContainer}>
                                <View style={styles.filled3} />
                                <View style={styles.unfilled3} />
                            </View>
                        </View>
                        <View style={styles.starRow}>
                            <Text style={styles.no}>2</Text>
                            <Image source={UNSELECTED_STAR} style={styles.innerStar} />
                            <View style={styles.progressContainer}>
                                <View style={styles.filled4} />
                                <View style={styles.unfilled4} />
                            </View>
                        </View>
                        <View style={styles.starRow}>
                            <Text style={styles.no}>1</Text>
                            <Image source={UNSELECTED_STAR} style={styles.innerStar} />
                            <View style={styles.progressContainer}>
                                <View style={styles.filled5} />
                                <View style={styles.unfilled5} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.horizontalLine} />
                {this.renderReviewList()}
            </View>
        )
    }

    renderViewAll = () => {
        const { productData, selectedProduct, selectedImage } = this.state;
        const { attributes } = productData;
        const price = selectedProduct ? selectedProduct.attributes?.price : attributes?.price;
        const stock_qty = selectedProduct ? selectedProduct.attributes.stock_qty : attributes.stock_qty;
        const on_sale = selectedProduct ? selectedProduct.attributes.on_sale : attributes.on_sale;
        const sale_price = selectedProduct ? selectedProduct.attributes.sale_price : attributes.sale_price;
        return (
            <>
                <ScrollView style={{ marginBottom: verticalScale(50), backgroundColor: COLOR_CONST.lightGreyText }}>
                    {productData && <View style={styles.productImageContainer}>
                        <Image resizeMode={'contain'} source={
                            this.state.selectedImage
                                ? { uri: selectedImage }
                                : productData?.attributes?.images.data[0].attributes && productData?.attributes?.images.data.length > 0
                                    ? { uri: productData?.attributes?.images?.data[0].attributes.url }
                                    : {}}
                            style={styles.imageStyle}
                        />
                    </View>}
                    <View style={styles.variantList}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            extraData={this.state}
                            data={selectedProduct && selectedProduct?.attributes?.images?.data}
                            renderItem={({ item, index }) => this.renderVarientImageItems(item, index)}
                        />
                    </View>
                    {productData && <View style={styles.productNameContainer}>
                        <TouchableOpacity style={styles.heartConatiner} onPress={() => this.onHeartPress(productData, 'description')}>
                            {productData?.attributes?.wishlisted ? (
                                <Image source={redHeart} style={styles.heart} />
                            ) : (
                                <Image source={heartWishlist} style={styles.heart} />)
                            }
                        </TouchableOpacity>
                        <Text style={styles.productName}>{productData?.attributes?.name}</Text>
                        <View style={styles.priceRow}>
                            <View style={styles.insidePriceBox1}>
                                {productData && on_sale ? (<View style={styles.discountRow}>
                                    <Text style={styles.price}>{themeJson.attributes.currency_type} {sale_price}</Text>
                                </View>) : (<Text style={styles.price}>{themeJson.attributes.currency_type} {price}</Text>)}
                                {stock_qty !== 0 ? <>
                                    <Image source={STOCK_TICK} style={styles.stockTick} />
                                    <Text style={styles.inStockText}>In stock </Text>
                                    {/* </View>                                 */}
                                </> :
                                    <>
                                        <View style={styles.outStock}>
                                            <Image source={SOLD_OUT_ICON} style={styles.stockTick} />
                                            <Text style={styles.soldOutText}>Out of stock </Text>
                                        </View>
                                    </>}
                            </View>
                            <View style={[styles.insidePriceBox2]}>
                                {stock_qty !== 0 ?
                                    <View style={[styles.tools, {}]}>
                                        <TouchableOpacity onPress={() => this.onUpdateCartValue(false)} >
                                            <Text style={styles.minus}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.count}>{this.state.quantity}</Text>
                                        <TouchableOpacity onPress={() => this.onUpdateCartValue(true)}>
                                            <Text style={styles.plus}>+</Text>
                                        </TouchableOpacity>
                                    </View> : null}
                            </View>
                        </View>

                        {on_sale ?
                            <Text style={styles.discountPrice}> {themeJson.attributes.currency_type} {price}</Text> : null}
                    </View>}
                    {productData && this.renderSelectorTools()}

                    {productData && <View style={styles.descrpitionStyle}>
                        <View style={styles.descrpitionReadStyle}>
                            <Text style={styles.specifictaionTitle}>DESCRIPTION</Text>
                            <ReadMore
                                numberOfLines={2}
                                renderTruncatedFooter={this.renderTruncatedFooter}
                                renderRevealedFooter={this.renderRevealedFooter}
                            >
                                <Text style={styles.DiscantaintType}>
                                    {productData.attributes?.description}
                                </Text>
                            </ReadMore>
                        </View>
                    </View>}

                    {this.renderProductReviewView()}

                    {productData?.attributes?.similar_products?.data?.length > 0 && <View style={styles.productGrid}>
                        <ProductGrid
                            name={'Similar Product'}
                            data={productData.attributes.similar_products.data}
                            onPress={(item: any) => this.similarProducts(item)}
                            onHeartPress={(item: any) => this.onHeartPress(item, 'similarProducts')}
                        />
                    </View>}

                </ScrollView>
                <View style={styles.ButtonConatiner}>
                    {stock_qty !== 0 ? (this.renderButton()) : (selectedProduct && this.renderNotification())}
                </View>
            </>
        )
    }

    renderGuestModal = () => {
        return (
          <Modal
            animationType="slide"
            transparent={this.state.showGuestModal}
            visible={this.state.showGuestModal}
            onRequestClose={() => {
              this.setState({ showGuestModal: false });
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { }}
              style={styles.modalContainer1}>
              <View style={styles.popup1}>
                <Text style={styles.deleteAddress1}>
                  Please Sign Up/Log In first
                </Text>
                <Text style={styles.areYouSure1}>
                  You need an account to perform this action.
                </Text>
                <View style={styles.bottomPopupView1}>
                  <TouchableOpacity
                    style={{ flex: 1, alignItems: 'center' }}
                    onPress={() => this.setState({ showGuestModal: false })}>
                    <Text style={styles.cancelText1}>Cancel</Text>
                  </TouchableOpacity>
                  <View style={styles.verticalLine1} />
                  <TouchableOpacity
                    style={{ flex: 1, alignItems: 'center' }}
                    onPress={() => {
                     this.setState({ showGuestModal: false }, () => {
                        this.props.navigation.replace('Auth');
                     })
                    }
                    }>
                    <Text style={styles.yesDelete1}>SIGN UP/LOG IN</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
        );
      };

    renderNotification = () => {
        const isNotified = this.state.showNotifyButton
        const { selectedProduct, productData } = this.state;
        const { attributes } = productData;
        const productNotified = selectedProduct ? selectedProduct.attributes.is_notify_product : false;
        return (
            <View style={styles.InnerConatinerNOTIFICATION}>
                {
                    productNotified ? <Text style={styles.getNotified}>You will get notified once the product is back in stock.</Text> :
                        <>
                            <View style={styles.NotificationTitle}>
                                <Text style={styles.currentlyOut}>The Item is currently out of stock</Text>
                            </View>

                            <TouchableOpacity onPress={() => {
                                this.notifyProduct()
                            }} >
                                <LinearGradient colors={[themeJson.attributes.common_button_color, themeJson.attributes.common_button_color]}
                                    style={styles.BUYbuttonCustom}>
                                    <Text style={styles.BUYcustomTxtStyle}>NOTIFY ME</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </>}
            </View>
        )
    }
    renderButton = () => {
        const { productData, selectedProduct, quantity } = this.state;
        const isUpdate = (selectedProduct?.attributes?.cart_quantity !== Number(quantity)) && selectedProduct?.attributes?.cart_quantity > 0;
        const isInCart = (selectedProduct?.attributes?.cart_quantity > 0);
        return (
            <View style={styles.InnerConatiner}>
                <TouchableOpacity disabled={!this.state.isProductAvailable} onPress={() => this.addToCart()}>
                    <LinearGradient colors={[themeJson.attributes.common_button_color, themeJson.attributes.common_button_color]} style={[styles.AddbuttonCustom1, { opacity: this.state.isProductAvailable ? 1 : 0.5 }]}>
                        <Text style={styles.AddcustomTxtStyle}>{!isInCart ? 'ADD TO CART' : isUpdate ? "UPDATE CART" : 'GO TO CART'}</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity disabled={!this.state.isProductAvailable} onPress={() => this.onPressBuyNow()}>
                    <LinearGradient colors={[COLOR_CONST.buyNowButton, COLOR_CONST.buyNowButton]} style={[styles.BUYbuttonCustom1, { opacity: this.state.isProductAvailable ? 1 : 0.5 }]}>
                        <Text style={styles.BUYcustomTxtStyle}>BUY NOW</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
    renderTruncatedFooter = (handlePress: any) => {
        return (
            <Text style={styles.readmore} onPress={handlePress}>
                Read more
            </Text>
        );
    };

    renderRevealedFooter = (handlePress: any) => {
        return (
            <Text style={styles.readmore} onPress={handlePress}>
                Show less
            </Text>
        );
    };
    renderNotifiyModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showNotifiyModal}
                onRequestClose={() => {
                    this.setState({ showNotifiyModal: false })
                }}
            >
                <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
                    <View style={styles.popup}>
                        <Text style={styles.deleteAddress}>Request Processed</Text>
                        <Text style={styles.areYouSure}>{configJSON.notifyMsg} </Text>
                        <View style={styles.bottomPopupView}>
                            <TouchableOpacity onPress={() => this.setState({ showNotifiyModal: false })}>
                                <Text style={styles.cancelText}>Okay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
    render() {
        return (
            //Merge Engine DefaultContainer
            <SafeAreaView style={styles.container}>
                <FocusAwareStatusBar barStyle="dark-content" backgroundColor={COLOR_CONST.white} isFocused={true} />
                <TopHeader
                    onPressLeft={() => this.handleBackButtonClick()}
                    headerLeftIconName={BACK_ICON}
                    headerRightIcons={[
                        {
                            src: SHARE_ICON, onPress: () => { this.onShare() },
                            style: { resizeMode: "stretch", width: scale(16), height: scale(21) }
                        },
                        {
                            src: CART_BLACK_ICON, onPress: () => { this.props.navigation.navigate("Shoppingcart") }, cartHasProductFlag: this.state.cartProduct?.has_cart_product,
                            style: { resizeMode: "contain" }
                        },
                    ]}
                    navigation={this.props.navigation}
                    headerLeftIconStyle={{}}
                    headerTitleStyle={{}}
                    headerStyle={{ elevation: 2 }}
                />
                {this.state.productData && this.renderViewAll()}
                {this.state.showNotifiyModal && this.renderNotifiyModal()}
                {this.renderGuestModal()}
                <ApplicationLoader isFetching={this.state.isFetching} />
                <CustomErrorModal showModal={this.state.showAlertModal} message={this.state.message}
                    isShowError={this.state.isShowError} hideErrorModal={() => this.setState({ showAlertModal: false })} />
            </SafeAreaView>
            //Merge Engine End DefaultContainer
        );
    }
}


// Customizable Area End
