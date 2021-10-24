import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogService } from '../input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page {
  items = [];
  errorMessage : string;
  //variables such a title and items
  title = "Grocery";

  constructor(public navCtrl: NavController, 
              public toastCtrl: ToastController, 
              public alertCtrl: AlertController,
              public dataService: GroceriesServiceService,
              public inputDialogService: InputDialogService,
              public socialSharing : SocialSharing) {
                this.loadItems();
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
    
  }

  ionViewDidLoad(){
    console.log("First load");
    this.loadItems();
  }

   /***
   * This function returns the list of items
   * This calls dataservice getItems()
   */
   loadItems () {
    return this.dataService.getItems().subscribe(
                          items => this.items = items,
                          error => this.errorMessage = <any>error);
  }

  /***
   * This function adds the new grocery item to the list
   */
  addItem() {
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
  }

/***
   * This function removes the selected item from the list of items
   * splice() is used to remove item from the list of items
   */  
  removeItem(item, index){
    console.log("Removing item - ", item, index)
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + index + " ...",
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
    this.dataService.removeItem(item);
  }

/***
   * This function share the selected item
   */  
 shareItem(item, index){
  console.log("Sharing item - ", item, index)
  const toast = this.toastCtrl.create({
    message: 'Sharing Item - ' + index + " ...",
    duration: 2000
  }).then((toastData) => {
    console.log(toastData);
    toastData.present();
  });
   let message = "Grocery item - Name : " + item.name + " Quantity: " + item.quantity;
  let subject = "Shared from Groceries App";
  this.socialSharing.share(message, subject).then(() => {
    console.log("Share successful");
  }).catch((error) => {
    console.error("Error while sharing", error);
  });
}


  /***
   * This function edits the selected item
   */  
 editItem(item, index){
  console.log("Editing item - ", item, index)
  const toast = this.toastCtrl.create({
    message: 'Editing Item - ' + index + " ...",
    duration: 2000
  }).then((toastData) => {
    console.log(toastData);
    toastData.present();
  });
  this.inputDialogService.showPrompt(item, index);
} 
  
}
