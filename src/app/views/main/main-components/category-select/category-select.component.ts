import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConstListService } from 'src/app/services/const-list.service';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'main-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss'],
})
export class CategorySelectComponent implements OnInit {
  constructor(private constService: ConstListService, public productService: ProductService) {}
  @Output() categoriesSelected = new EventEmitter<{ categoryId; subcategoryId }>();

  categories = [];

  subcategories = [];
  category;
  subcategory;

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.categories = await this.constService.getCategories();
  }
  async onChangeCategory(category) {
    this.subcategory = null;
    this.subcategories = [];
    this.subcategories = await this.constService.getSubcategoriesByCate(category.id);
  }

  onChangeSubcategory(subcategory) {
    const categoryId = this.category.id;
    const subcategoryId = subcategory.id;
    this.categoriesSelected.emit({ categoryId, subcategoryId });
  }
}
