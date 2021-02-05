import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { OfferPendingComponent } from './offer-pending/offer-pending.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { OfferPaymentComponent } from './offer-payment/offer-payment.component';
import { OfferShipmentComponent } from './offer-shipment/offer-shipment.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, NgSelectModule],
  declarations: [OfferPendingComponent, CreateOfferComponent, OfferPaymentComponent, OfferShipmentComponent],
  exports: [OfferPendingComponent, CreateOfferComponent, OfferPaymentComponent, OfferShipmentComponent],
})
export class OfferModalsModule {}
