//
//  Hyperpay.h
//  Freemium87482
//
//  Created by laxman dombale on 11/11/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <OPPWAMobile/OPPWAMobile.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

@interface Hyperpay : RCTEventEmitter <RCTBridgeModule ,PKPaymentAuthorizationViewControllerDelegate>

@property (nonatomic, strong) PKPaymentAuthorizationViewController * _Nullable viewController;

@property (nonatomic, strong, nullable) RCTPromiseResolveBlock requestPaymentResolve;
@property (nonatomic, strong, nullable) RCTPromiseResolveBlock completeResolve;
@property (nonatomic, copy, nullable) void (^completion)(PKPaymentAuthorizationStatus);

@end

NS_ASSUME_NONNULL_END
