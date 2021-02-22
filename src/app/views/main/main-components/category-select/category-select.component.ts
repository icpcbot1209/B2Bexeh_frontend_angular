import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'main-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss'],
})
export class CategorySelectComponent implements OnInit {
  constructor(public productService: ProductService) {}
  @Output() categoriesSelected = new EventEmitter<{ categoryId; subcategoryId }>();

  categories = [];

  subcategories = [];
  category;
  subcategory;

  ngOnInit(): void {
    this.init();
  }
  init() {
    this.productService.getCategories().subscribe((resp) => {
      this.categories = resp['data']['rows'];
    });
  }
  onChangeCategory(category) {
    this.productService.getSubcategories(category.id).subscribe((resp) => {
      this.subcategories = resp['data']['rows'];
    });
    this.subcategory = null;
  }

  onChangeSubcategory(subcategory) {
    const categoryId = this.category.id;
    const subcategoryId = subcategory.id;
    this.categoriesSelected.emit({ categoryId, subcategoryId });
  }
}
