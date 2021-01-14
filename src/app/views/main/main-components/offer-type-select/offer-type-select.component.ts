import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "main-offer-type-select",
  templateUrl: "./offer-type-select.component.html",
  styleUrls: ["./offer-type-select.component.scss"],
})
export class OfferTypeSelectComponent implements OnInit {
  @Output() valueChanged = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.theItem = this.items[0];
  }

  items = [
    { id: "All", label: "All" },
    { id: "Hobby", label: "Hobby" },
    { id: "Blaster", label: "Blaster" },
    { id: "Jumbo", label: "Jumbo" },
    { id: "Cellos", label: "Cellos/Fat Packs" },
    { id: "Choice", label: "Choice" },
    { id: "FOTL", label: "FOTL" },
    { id: "Fast Break", label: "Fast Break" },
    { id: "Hanger", label: "Hanger" },
    { id: "Hybrid", label: "Hybrid" },
    { id: "Mega", label: "Mega" },
    { id: "Retail", label: "Retail/Other" },
    { id: "Super Jumbos", label: "Super Jumbos" },
    { id: "T-mall", label: "T-mall" },
    { id: "Tins", label: "Tins" },
    { id: "x (Gaming Only)", label: "x (Gaming Only)" },
  ];

  theItem = null;
  onSelectItem(item) {
    this.valueChanged.emit(item.id);
  }
}
