import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class OfferStepperComponent {
  isLinear = false;
  constructor(
    public dialogRef: MatDialogRef<ModalCreateHopeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private offerService: OfferService,
    public userService: UserService,
    private chattingService: ChattingService,
    public configs: ConfigsService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleOfferChanged(offer: IOffer) {
    this.data.offer = offer;
    console.log(this.data.offer);
  }

  statusState(offer: IOffer, pos: number): string {
    const num = this.offerService.statusOffer(offer).num;
    if (num > pos) return 'done';
    if (num === pos) return 'edit';
    if (num < pos) return 'number';
  }
}
interface DialogData {
  offer: IOffer;
}
