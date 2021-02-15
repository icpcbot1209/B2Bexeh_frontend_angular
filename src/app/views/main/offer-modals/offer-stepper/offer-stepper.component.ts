import { OnInit } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IHope } from 'src/app/interfaces/IHope';
import { IRespProduct } from 'src/app/interfaces/IRespProduct';
import { ModalCreateHopeComponent } from '../../pages/product/modal-create-hope/modal-create-hope.component';
import { IOffer } from 'src/app/interfaces/IOffer';
import { OfferService } from 'src/app/services/offer.service';
import { UserService } from 'src/app/services/user.service';
import { ChattingService } from 'src/app/services/chatting.service';
import { ConfigsService } from 'src/app/services/configs.service';

import { STEPPER_GLOBAL_OPTIONS, StepState } from '@angular/cdk/stepper';

@Component({
  selector: 'main-offer-stepper',
  templateUrl: './offer-stepper.component.html',
  styleUrls: ['./offer-stepper.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class OfferStepperComponent implements OnInit {
  isLinear = false;
  constructor(
    public dialogRef: MatDialogRef<ModalCreateHopeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private offerService: OfferService,
    public userService: UserService,
    public configs: ConfigsService
  ) {}

  ngOnInit() {
    this.setSelectedStepId(this.data.offer);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleOfferChanged(offer: IOffer) {
    this.data.offer = offer;
  }

  statusState(offer: IOffer, pos: number): string {
    const num = this.offerService.statusOffer(offer).num;
    if (num > pos) return 'done';
    if (num === pos) return 'edit';
    if (num < pos) return 'number';
  }

  selectedStepId = 0;
  setSelectedStepId(offer: IOffer, id?: number) {
    if (id) this.selectedStepId = id;
    else {
      if (!offer.is_accepted) this.selectedStepId = 0;
      else if (!offer.is_paid || !offer.is_shipped) this.selectedStepId = 1;
      else if (!offer.is_canceled) this.selectedStepId = 0;
    }
  }

  myFeedback(): string {
    if (this.data.offer.buyer_id === this.userService.me.id) return this.data.offer.feedback2seller;
    else return this.data.offer.feedback2buyer;
  }
}

interface DialogData {
  offer: IOffer;
}
