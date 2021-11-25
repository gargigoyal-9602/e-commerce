package ai.engineer.ecommerce.Freemium87482;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.net.Uri;
import android.os.IBinder;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Promise;

import com.facebook.react.bridge.WritableMap;
import com.oppwa.mobile.connect.payment.PaymentParams;
import com.oppwa.mobile.connect.payment.card.CardPaymentParams;
import com.oppwa.mobile.connect.exception.PaymentError;
import com.oppwa.mobile.connect.exception.PaymentException;
import com.oppwa.mobile.connect.payment.BrandsValidation;
import com.oppwa.mobile.connect.payment.CheckoutInfo;
import com.oppwa.mobile.connect.payment.ImagesRequest;
import com.oppwa.mobile.connect.provider.Connect;
import com.oppwa.mobile.connect.provider.ITransactionListener;
import com.oppwa.mobile.connect.provider.Transaction;
import com.oppwa.mobile.connect.provider.TransactionType;
import com.oppwa.mobile.connect.service.ConnectService;
import com.oppwa.mobile.connect.service.IProviderBinder;

import java.util.Map;
import java.util.HashMap;

import androidx.annotation.NonNull;

public class HyperpayModule extends  ReactContextBaseJavaModule  implements ITransactionListener{

    String TAG = "HYPERPAY";

    private static ReactApplicationContext reactContext;
    private IProviderBinder providerBinder;
    private Promise promise;
    HyperpayModule(ReactApplicationContext context) {
        super(context);
//        reactContext = context;
        Intent intent = new Intent(context, ConnectService.class);
        context.startService(intent);
        //we have a connection to the service
        ServiceConnection serviceConnection = new ServiceConnection() {
            @Override
            public void onServiceConnected(ComponentName name, IBinder service) {
                /* we have a connection to the service */
                providerBinder = (IProviderBinder) service;
                providerBinder.addTransactionListener(HyperpayModule.this);

                try {
                    providerBinder.initializeProvider(Connect.ProviderMode.TEST);
                } catch (PaymentException ee) {
//                showErrorDialog(ee.getMessage());
                    Log.d(TAG, "onServiceConnected: exception "+ ee.getMessage());
                }
            }

            @Override
            public void onServiceDisconnected(ComponentName name) {
                providerBinder = null;
            }
        };
        context.bindService(intent, serviceConnection, Context.BIND_AUTO_CREATE);
    }


    @ReactMethod
    public void transactionPayment(ReadableMap data, Promise promise) throws PaymentException {

        //Getting card details from JS react native.
        String checkoutId = data.getString("checkoutID");
        String paymentBrand = data.getString("paymentBrand");
        String cardNumber = data.getString("cardNumber");
        String holderName = data.getString("holderName");
        String cardExpiryMonth = data.getString("expiryMonth");
        String cardExpiryYear = data.getString("expiryYear");
        String cardCVV = data.getString("cvv");
        this.promise = promise;
        try{
            //Payment parameters
            PaymentParams paymentParams =  new CardPaymentParams(
                    checkoutId,
                    paymentBrand,
                    cardNumber,
                    holderName,
                    cardExpiryMonth,
                    cardExpiryYear,
                    cardCVV
            );//https://docs.google.com/document/d/1NI2xRAe9SL7rWG1leP9CZhWGlM7iGrQh7eB7uBV0KsM/edit
            paymentParams.setShopperResultUrl("Freemium87482.payments://result");

            Transaction transaction = new Transaction(paymentParams);
            providerBinder.submitTransaction(transaction);
//            promise.resolve("Got checkout ");
        } catch (PaymentException e){
            WritableMap map = Arguments.createMap();
            map.putString("status", "Failed");
            map.putString("error", e.getLocalizedMessage());
            promise.reject(e.getError().getErrorCode().toString(), e.getMessage());
            Log.d(TAG, "transactionPayment: error "+e.getMessage());
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "Hyperpay";
    }

    @Override
    public void brandsValidationRequestSucceeded(BrandsValidation brandsValidation) {
        Log.d(TAG, "brandsValidationRequestSucceeded: ");

    }

    @Override
    public void brandsValidationRequestFailed(PaymentError paymentError) {
        Log.d(TAG, "brandsValidationRequestFailed: ");
        promise.reject(String.valueOf(paymentError.getErrorCode()),paymentError.getErrorMessage());

    }

    @Override
    public void imagesRequestSucceeded(ImagesRequest imagesRequest) {
        Log.d(TAG, "imagesRequestSucceeded: ");

    }

    @Override
    public void imagesRequestFailed() {
        Log.d(TAG, "imagesRequestFailed: ");


    }

    @Override
    public void paymentConfigRequestSucceeded(CheckoutInfo checkoutInfo) {
        Log.d(TAG, "paymentConfigRequestSucceeded: ");
    }

    @Override
    public void paymentConfigRequestFailed(PaymentError paymentError) {
        Log.d(TAG, "paymentConfigRequestFailed: ");
        promise.reject(String.valueOf(paymentError.getErrorCode()),paymentError.getErrorMessage());

    }

    @Override
    public void transactionCompleted(Transaction transaction) {
        WritableMap map = Arguments.createMap();
        Log.d(TAG, "transaction  completed: ");

        if (transaction == null) {
            map.putString("status","failed");
            map.putString("error","Unable to perform transaction.");
            promise.resolve(map);
            return;
        }

        if (transaction.getTransactionType() == TransactionType.SYNC) {
            /* Send transaction complete status */
            map.putString("status","complete");
            map.putString("checkoutId",transaction.getPaymentParams().getCheckoutId());
        } else {
            /* wait for the callback in the onNewIntent() */
            map.putString("status","pending");
            map.putString("redirectURL",transaction.getRedirectUrl());
        }
        promise.resolve(map);
    }

    @Override
    public void transactionFailed(Transaction transaction, PaymentError paymentError) {
        WritableMap map = Arguments.createMap();
        Log.d(TAG, "transaction failed: ");

        if (transaction == null) {
            map.putString("status", "failed");
            map.putString("error", "Unable to perform transaction.");
            promise.resolve(map);
        } else {
            map.putString("status", "failed");
            map.putString("error", paymentError.getErrorMessage());
            promise.reject(String.valueOf(paymentError.getErrorCode()),paymentError.getErrorInfo());
        }
    }
}

