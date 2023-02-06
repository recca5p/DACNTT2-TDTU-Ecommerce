import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productSlug: any;
  productDetail: any;
  constructor(private productService: ProductService) {}

  async ngOnInit() {
    this.productSlug = localStorage.getItem('slug');
    await this.getProduct(this.productSlug);
  }

  async getProduct(slug: any) {
    await this.productService.getProduct(slug).then((response) => {
      this.productDetail = response;
      console.log(this.productDetail);
    });
  }
}
