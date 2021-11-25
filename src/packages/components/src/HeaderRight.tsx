import React from 'react';
import {Image, View,TouchableOpacity} from 'react-native';
import * as IMG_CONST from '../../blocks/studio-store-ecommerce-theme/src/ImageConstants';
import scale from '../../framework/src/utils/Scale'
import { NOTIFICATION1, NOTIFICATION_HOME, CART_HOME, CART_BLACK } from '../../blocks/studio-store-ecommerce-theme/src/AppAssets/appassets';

export const HeaderRight = (props:any) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity>
        {props.share ? (
          <Image
            source={IMG_CONST.SHARE_ICON}
            style={{margin: 10, width: 15.9, height: 21}}
          />
        ) : null}
      </TouchableOpacity>
      {props.showNotification ? (
        <TouchableOpacity onPress={() => props.onPress && props.onPress()}>
          {props.notifications_black ? (
            <Image
              source={NOTIFICATION_HOME}
              style={{marginTop: 10, width: 16, height: 19}}
            />
          ) : (
            <>
              <Image
                source={NOTIFICATION1}
                style={{margin: 10, width: 18, height: 20}}
              />
              {props.showNotificationDot && (
                <View
                  style={{
                    height: scale(6),
                    width: scale(6),
                    borderRadius: scale(3),
                    backgroundColor: 'red',
                    borderColor: 'white',
                    borderWidth: 0.9,
                    position: 'absolute',
                    top: scale(10),
                    end: scale(12),
                  }}
                />
              )}
            </>
          )}
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        onPress={props.handleCart}>
        {props.cart_black ? (
          <Image
            source={CART_BLACK}
            style={{margin: 10, width: 22, height: 20}}
          />
        ) : (
          <>
            <Image
              source={CART_HOME}
              style={{marginRight: 25, marginTop: 10, width: 22, height: 20}}
            />
            {props.cartHasProductFlag && (
              <View
                style={{
                  height: scale(6),
                  width: scale(6),
                  borderRadius: scale(3),
                  backgroundColor: 'red',
                  borderColor: 'white',
                  borderWidth: 0.9,
                  position: 'absolute',
                  top: scale(10),
                  end: scale(22),
                }}
              />
            )}
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};
