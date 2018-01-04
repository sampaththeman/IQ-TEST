import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { CartPage}  from '../cart/cart';
import { NotificationPage } from '../notification/notification';
import {FinalCartForServerProvider}  from '../../providers/final-cart-for-server/final-cart-for-server'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
 CartBadgeCount : number = 0; // default 0
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = CartPage;
  tab5Root = NotificationPage;

  constructor(public FinalCart:FinalCartForServerProvider) {

  }

  load(){
  	 return  this.CartBadgeCount =  this.FinalCart.CartBadgeCount;
  }
}
