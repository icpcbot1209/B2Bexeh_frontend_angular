import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { BootstrapModule } from 'src/app/components/bootstrap/bootstrap.module';

import { CreateOfferComponent } from './create-offer/create-offer.component';
import { OfferPaymentComponent } from './offer-payment/offer-payment.component';
import { OfferShipmentComponent } from './offer-shipment/offer-shipment.component';
import { OfferStepperComponent } from './offer-stepper/offer-stepper.component';
import { OfferContractComponent } from './offer-contract/offer-contract.component';
import { OfferFeedbackComponent } from './offer-feedback/offer-feedback.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, NgSelectModule, BootstrapModule],
  declarations: [
    CreateOfferComponent,
    OfferPaymentComponent,
    OfferShipmentComponent,
    OfferStepperComponent,
    OfferContractComponent,
    OfferFeedbackComponent,
  ],
  exports: [CreateOfferComponent, OfferStepperComponent],
})
export class OfferModalsModule {}
