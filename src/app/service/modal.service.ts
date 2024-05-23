import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class ModalService {
    isModalOpen: boolean = false;
    isModalProduct : boolean = false;
    isModalForgotPassword: boolean = false;
  
    constructor() { }
  
    openModal() {
      this.isModalOpen = true;
    }

    openModalProduct() {
      this.isModalProduct = true;
    }
  
    closeModal() {
      this.isModalOpen = false;
      this.isModalProduct = false;
      this.isModalForgotPassword = false;
    }

    openModelForgorPassword(){
      this.isModalForgotPassword = true;
    }
  }