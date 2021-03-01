import { OnInit } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IOffer } from 'src/app/interfaces/IOffer';
import { IFlowStep, OfferService } from 'src/app/services/offer.service';
import { UserService } from 'src/app/services/user.service';

import { STEPPER_GLOBAL_OPTIONS, StepState } from '@angular/cdk/stepper';
import { CreateOfferComponent } from '../create-offer/create-offer.component';

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
  flowSteps: IFlowStep[] = [];
  currentStepId = 0;

  constructor(
    public dialogRef: MatDialogRef<CreateOfferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private offerService: OfferService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.updateSteps(this.data.offer);
  }

  updateSteps(offer: IOffer) {
    let { flowSteps, currentStepId } = this.offerService.makeFlowSteps(offer);
    this.flowSteps = flowSteps;
    this.currentStepId = currentStepId > -1 ? currentStepId : 0;
  }

  handleOfferChanged(offer: IOffer) {
    this.data.offer = offer;
    this.updateSteps(offer);
  }
}

interface DialogData {
  offer: IOffer;
}
