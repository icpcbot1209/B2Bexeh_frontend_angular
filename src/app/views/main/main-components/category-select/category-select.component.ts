import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'main-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss'],
})
export class CategorySelectComponent implements OnInit {
  @Output() categoriesSelected = new EventEmitter<{ categoryId; subcategoryId }>();

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.init();
  }

  categories = [];
  init() {
    this.productService.getCategories().subscribe((resp) => {
      this.categories = resp['data']['rows'];
    });
  }

  subcategories = [];
  category;
  subcategory;
  onChangeCategory(category) {
    this.productService.getSubcategories(category.id).subscribe((resp) => {
      this.subcategories = resp['data']['rows'];
    });
    this.subcategory = null;
  }

  onChangeSubcategory(subcategory) {
    let categoryId = this.category.id;
    let subcategoryId = subcategory.id;
    this.categoriesSelected.emit({ categoryId, subcategoryId });
  }
}
