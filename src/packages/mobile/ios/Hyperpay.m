//
//  Hyperpay.m
//  Freemium87482
//
//  Created by laxman dombale on 11/11/20.
//  Copyright © 2020 Facebook. All rights reserved.
//


#import <Foundation/Foundation.h>
#import "Hyperpay.h"
#import <React/RCTLog.h>
@implementation Hyperpay

OPPPaymentProvider *provider;
NSString *applepayCheckoutId;



RCT_EXPORT_MODULE(Hyperpay)

-(instancetype)init
{
    self = [super init];
    if (self) {
      #ifdef DEBUG
        provider = [OPPPaymentProvider paymentProviderWithMode:OPPProviderModeTest];
//       provider = [OPPPaymentProvider paymentProviderWithMode:OPPProviderModeLive];
      
     #else
        provider = [OPPPaymentProvider paymentProviderWithMode:OPPProviderModeTest];
//      provider = [OPPPaymentProvider paymentProviderWithMode:OPPProviderModeLive];
     #endif
    }
    
    return self;
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"onTransactionComplete"];
}


/**
 React Native functions
 */

RCT_EXPORT_METHOD(canUseApplePay:(NSDictionary*)options resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  
  NSString *applepaySupported = [OPPPaymentProvider deviceSupportsApplePay] ? @"YES" : @"NO";
  
  NSDictionary *isApplepaySupported =@{
    @"supported": applepaySupported,
  };
  
  resolve(isApplepaySupported);
  
}

RCT_EXPORT_METHOD(transactionPayment: (NSDictionary*)options resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    
    NSError * _Nullable error;
   
  for (NSString *key in options) {
        NSLog(@"key: %@, value: %@ \n", key, [options valueForKey:key]);
    }
    OPPCardPaymentParams *params = [OPPCardPaymentParams cardPaymentParamsWithCheckoutID:[options valueForKey:@"checkoutID"]
                                                                        paymentBrand:[options valueForKey:@"paymentBrand"]
                                                                              holder:[options valueForKey:@"holderName"]
                                                                              number:[options valueForKey:@"cardNumber"]
                                                                         expiryMonth:[options valueForKey:@"expiryMonth"]
                                                                          expiryYear:[options valueForKey:@"expiryYear"]
                                                                                 CVV:[options valueForKey:@"cvv"]
                                                                               error:&error];
    if (error) {
      NSLog(@"%s", "error");

      reject(@"transactionPayment",error.localizedDescription, error);
    } else {
       params.shopperResultURL = @"org.reactjs.native.example.Freemium87482.payments://result";
       //https://www.youtube.com/
      //https://docs.google.com/document/d/1NI2xRAe9SL7rWG1leP9CZhWGlM7iGrQh7eB7uBV0KsM/edit
      //params.tokenizationEnabled = YES;
      OPPTransaction *transaction = [OPPTransaction transactionWithPaymentParams:params];

      [provider submitTransaction:transaction completionHandler:^(OPPTransaction * _Nonnull transaction, NSError * _Nullable error) {
        NSLog(@"%s", "proveder mode");
        NSLog(@"%ld", (long)[provider mode]);
        NSDictionary *transactionResult;
        if (transaction.type == OPPTransactionTypeAsynchronous) {
          // Open transaction.redirectURL in Safari browser to complete the transaction
//
//          [self sendEventWithName:@"onSessionConnect" body:@{@"redirectURL": transaction.redirectURL.absoluteString, @"status":@"pending",
//                                                             @"checkoutID":transaction.paymentParams.checkoutID
//          }];
          NSLog(@"%s", "aysnc");
          NSLog(@"%@", transaction.redirectURL.absoluteString);
          
           transactionResult = @{
          @"redirectURL":transaction.redirectURL.absoluteString,
          @"status":@"pending",
          @"checkoutId":transaction.paymentParams
          };
          resolve(transactionResult);
        }  else if (transaction.type == OPPTransactionTypeSynchronous) {
          NSLog(@"%@", [transaction resourcePath]);
          NSLog(@"%s", "sync");
          transactionResult = @{
          @"status":@"complete",
          @"checkoutId":transaction.paymentParams.checkoutID
          };
          NSLog(@"%s", "resolving trascation result");

          resolve(transactionResult);
//                    NSLog(@"%s", "resolving trascation");
//         resolve(transaction);
        } else {
          NSLog(@"%s", "error payment");
          reject(@"transactionPayment",error.localizedDescription, error);
          // Handle the error
        }
      }];
    }
}

//applepay functions

- (void) paymentAuthorizationViewController:(PKPaymentAuthorizationViewController *)controller
                        didAuthorizePayment:(PKPayment *)payment
                                 completion:(void (^)(PKPaymentAuthorizationStatus))completion
{
  
    self.completion = completion;
 
    if (self.requestPaymentResolve != NULL) {
      NSLog(@"%@", applepayCheckoutId);
      NSLog(@"%@", payment.token.paymentData);
      OPPApplePayPaymentParams *params = [OPPApplePayPaymentParams applePayPaymentParamsWithCheckoutID:applepayCheckoutId tokenData:payment.token.paymentData error:nil];
      
      
         //submit transaction
      [provider submitTransaction:[OPPTransaction transactionWithPaymentParams:params] completionHandler: ^(OPPTransaction *transaction, NSError *error){
        NSDictionary *transactionResult;
        if(error){
          NSLog(@"Erorr Submiting transaction: %@",error.localizedDescription);
          transactionResult = @{
          @"status":@"error",
          @"checkoutId":transaction.paymentParams.checkoutID
          };
          self.requestPaymentResolve(transactionResult);
          self.requestPaymentResolve = NULL;
          self.completion(PKPaymentAuthorizationStatusFailure);
        }else{
          transactionResult = @{
          @"status":@"done",
          @"checkoutId":transaction.paymentParams.checkoutID
          };
          NSLog(@"%s","transaction Submtiterd");
          self.requestPaymentResolve(transactionResult);
           self.requestPaymentResolve = NULL;
          self.completion(PKPaymentAuthorizationStatusSuccess);
        }
      }];
       
       
        }
}

- (void)paymentAuthorizationViewControllerDidFinish:(nonnull PKPaymentAuthorizationViewController *)controller {
  NSLog(@"%s","Should dismiss the app");
  dispatch_async(dispatch_get_main_queue(), ^{
      [controller dismissViewControllerAnimated:YES completion:^void {
          if (self.completeResolve != NULL) {
              self.completeResolve(nil);
              self.completeResolve = NULL;
          }
      }];
  });
}

RCT_EXPORT_METHOD(applepayTransaction: (NSDictionary*)options resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  
  for (NSString *key in options) {
      NSLog(@"key: %@, value: %@ \n", key, [options valueForKey:key]);
  }
  NSLog(@"%s", "ApplePay");
  
  applepayCheckoutId = [options valueForKey:@"applepayCheckoutId"];
  NSString *amountSTR = [options  valueForKey:@"amount"];
 
  NSDecimalNumber *amount = [NSDecimalNumber decimalNumberWithString:amountSTR];

  NSString *merchantIdentifier = @"merchant.com.icenna.live";
  
  //Replace the merchantIdentifier with yours and the country code with SA
  PKPaymentRequest *request = [OPPPaymentProvider paymentRequestWithMerchantIdentifier:merchantIdentifier countryCode:@"SA"];
  if (@available(iOS 12.1.1, *)) {
    request.supportedNetworks = @[PKPaymentNetworkMada, PKPaymentNetworkMasterCard, PKPaymentNetworkVisa];
  } else {
    // Fallback on earlier versions
    request.supportedNetworks = @[ PKPaymentNetworkMasterCard, PKPaymentNetworkVisa];
  }
  
  request.currencyCode = @"SAR";
  
  
  //NSLog(@"%s", "ApplePay");
   NSLog(@"%@", applepayCheckoutId);


  
  request.paymentSummaryItems = @[[PKPaymentSummaryItem summaryItemWithLabel:@"ICenna" amount:amount]];
  
//  if ([OPPPaymentProvider canSubmitPaymentRequest:request]) {
      self.viewController = [[PKPaymentAuthorizationViewController alloc] initWithPaymentRequest: request];
      self.viewController.delegate = self;
      dispatch_async(dispatch_get_main_queue(), ^{
          UIViewController *rootViewController = RCTPresentedViewController();
          [rootViewController presentViewController:self.viewController animated:YES completion:nil];
          self.requestPaymentResolve = resolve;
      });
 // } else {
 //     NSLog(@"Apple Pay not supported.");
 // }

  
  
  
  
}

RCT_EXPORT_METHOD(tokenizedTransaction: (NSDictionary*)options resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSError * _Nullable error;
  
 
  OPPTokenPaymentParams *tokenParams = [OPPTokenPaymentParams tokenPaymentParamsWithCheckoutID:[options valueForKey:@"checkoutID"] tokenID:[options valueForKey:@"tokenID"] paymentBrand:[options valueForKey:@"paymentBrand"] error:&error];
  if (error) {
      // See error.code (OPPErrorCode) and error.localizedDescription to identify the reason of failure.
    reject(@"tokenizedTransaction",error.localizedDescription, error);
  }else{
    OPPTransaction *transaction = [OPPTransaction transactionWithPaymentParams:tokenParams];
    
    
    [provider submitTransaction:transaction completionHandler:^(OPPTransaction * _Nonnull transaction, NSError * _Nullable error) {
      if (transaction.type == OPPTransactionTypeAsynchronous) {
        // Open transaction.redirectURL in Safari browser to complete the transaction
      }  else if (transaction.type == OPPTransactionTypeSynchronous) {
       resolve(transaction);
      } else {
        reject(@"tokenizedTransaction",error.localizedDescription, error);
        // Handle the error
      }
    }];
    
    
  }
  
  
  
  
}


RCT_EXPORT_METHOD(validateCardInfo:(NSDictionary*)options resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  if(![OPPCardPaymentParams isHolderValid:[options valueForKey:@"cardNumber"]]){
    reject(@"validateCardInfo", @"invalid card number",nil);
  }else if(![OPPCardPaymentParams isCvvValid:[options valueForKey:@"cvv"]]){
    reject(@"validateCardInfo", @"invalid CVV", nil);
  }else if(![OPPCardPaymentParams isExpiryYearValid:[options valueForKey:@"expiryYear"]]){
             reject(@"validateCardInfo", @"invalid expiry Year", nil);
  }else if(![OPPCardPaymentParams isExpiryMonthValid:[options valueForKey:@"expiryMonth"]]){
    reject(@"validateCardInfo", @"invalid expiry month", nil);
  }else if(![OPPCardPaymentParams isExpiredWithExpiryMonth:[options valueForKey:@"expiryMonth"] andYear:[options valueForKey:@"expiryYear"]]){
    reject(@"validateCardInfo", @"Card is expiried", nil);
  }else{
    resolve([NSNull null]);
  }
}

@end
