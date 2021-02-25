import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstListService } from 'src/app/services/const-list.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackService } from 'src/app/services/snack.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'main-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  constructor(
    public constService: ConstListService,
    public productService: ProductService,
    private userService: UserService,
    private snack: SnackService
  ) {}
  @Input() isOpen: boolean;
  @Output() productsChanged = new EventEmitter<any[]>();

  filters: Filter[] = [
    {
      uid: '0',
      title: 'Categories',
    },
    {
      uid: '1',
      title: 'Popular',
      icon: 'iconsminds-business-mens',
      description: 'Items that have the most buy/sell offers',
    },
    {
      uid: '2',
      title: 'New Arrivals',
      icon: 'iconsminds-add-bag',
      description: 'Items that have just been released',
    },
    {
      uid: '3',
      title: 'Watch List',
      icon: 'iconsminds-receipt-4',
      description: "Items that i've hearted",
    },
  ];
  theFilter: Filter;

  categories = [];

  subcategories = [];
  category;
  subcategory;

  isBusy = false;
  products = [];

  ngOnInit(): void {
    this.init();
  }
  setFilter(filter: Filter) {
    if (this.theFilter === filter) {
      return;
    }
    this.theFilter = filter;

    this.category = null;
    this.subcategory = null;

    if (filter.uid === '1') {
      // popular
      this.getProducts(this.productService.getProductsPopular());
    } else if (filter.uid === '2') {
      // new arrivals
      this.getProducts(this.productService.getProductsNewArrival());
    } else if (filter.uid === '3') {
      // watch list
      this.getProducts(this.productService.getProductsWatchList(this.userService.me.user_uid));
    }
  }

  async init() {
    this.categories = await this.constService.getCategories();
  }
  async onChangeCategory(category) {
    this.subcategories = await this.constService.getSubcategories(category.id);

    this.subcategory = null;
  }

  onChangeSubcategory(subcategory) {
    this.getProducts(this.productService.getProductsByCategory(this.category.id, subcategory.id));
  }

  getProducts(observable: Observable<any>) {
    this.isBusy = true;
    observable.subscribe(
      (resp) => {
        this.products = resp['data']['rows'] || resp['data'];
        this.productsChanged.emit(this.products);
        this.isBusy = false;
      },
      (err) => {
        console.error(err);
        this.snack.error(err.message);
        this.isBusy = false;
      }
    );
  }
}

interface Filter {
  uid: string;
  title: string;
  description?: string;
  icon?: string;
  sports?: string;
  year?: string;
}
