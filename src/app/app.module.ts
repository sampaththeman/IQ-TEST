import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TextMaskModule } from 'angular2-text-mask';
import { CommonModule } from '@angular/common';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import  firebase  from 'firebase';
import { IonicStorageModule } from '@ionic/storage';
import {HomeSearchPage}  from '../pages/home-search/home-search';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailsPage } from '../pages/details/details';
import {LoginPage} from  '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {UserRegistrationPage}  from '../pages/user-registration/user-registration';
import {CartPage} from '../pages/cart/cart';
import {NotificationPage} from '../pages/notification/notification';
import { CartProvider } from '../providers/cart/cart';
import { SelectCartProvider } from '../providers/select-cart/select-cart';
import {ListPage} from '../pages/list/list';
import { DragulaModule } from 'ng2-dragula';
import {AccordianComponent}  from '../components/accordian/accordian';
import {HideHeaderDirective}  from '../directives/hide-header/hide-header';
import {SegmentFilterPipe}  from '../pipes/segment-filter/segment-filter';
import { FinalCartForServerProvider } from '../providers/final-cart-for-server/final-cart-for-server';
import {ExpandableHeaderComponent} from '../components/expandable-header/expandable-header';
import {ProfilePopoverPage} from '../pages/profile-popover/profile-popover';
import {ProfileEditPage}  from '../pages/profile-edit/profile-edit';
import {InlineEditorModule} from 'ng2-inline-editor';
import {OrdersPage}  from '../pages/orders/orders';
import {SinglePurchasePage}  from '../pages/single-purchase/single-purchase';
import { Keyboard } from '@ionic-native/keyboard';
import {OfferLoadPage} from '../pages/offer-load/offer-load';

//firebase config file 
export const firebaseConfig={
    apiKey: "AIzaSyATR-VWhw4o-I79yyg9u_Dn1IMBj0aggLQ",
    authDomain: "iq-social-login.firebaseapp.com",
    databaseURL: "https://iq-social-login.firebaseio.com",
    projectId: "iq-social-login",
    storageBucket: "iq-social-login.appspot.com",
    messagingSenderId: "1086149147249"
}

firebase.initializeApp(firebaseConfig)

@NgModule({
    declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DetailsPage,
    SinglePurchasePage,
    LoginPage,
    UserRegistrationPage,
    CartPage,
    OfferLoadPage,
    ProfilePopoverPage,
    ProfileEditPage,
    HomeSearchPage,
    NotificationPage,
    AccordianComponent,
    HideHeaderDirective,
    OrdersPage,
    ExpandableHeaderComponent,
    SegmentFilterPipe,
    ListPage
    ],
    imports: [
    BrowserModule,
    CommonModule,
    InlineEditorModule,
    BrowserAnimationsModule,
    HttpModule,
    TextMaskModule,
    DragulaModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{
        // mode: 'ios',
        // backButtonIcon: 'arrow-back',
        // iconMode: 'ios',
        // pageTransition: 'ios',
    })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DetailsPage,
    SinglePurchasePage,
    ProfilePopoverPage,
    ProfileEditPage,
    LoginPage,
    HomeSearchPage,
    UserRegistrationPage,
    CartPage,
    OfferLoadPage,
    OrdersPage,
    NotificationPage,
    ListPage
    
    ],
    providers: [
    StatusBar,
    HttpModule,
    Facebook,
    Keyboard,
    SplashScreen,
    CartProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SelectCartProvider,
    FinalCartForServerProvider,
    
    ]
})
export class AppModule {}
