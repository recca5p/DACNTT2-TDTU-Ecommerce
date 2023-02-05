import { ProductService } from './../product.service';
import { BrandService } from './../../brand/brand.service';
import { CategoryService } from './../../category/category.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  public catogories: any;
  public brands: any;
  public thumbnailUrl: any;
  public imageUrls: any;

  constructor(
    private categoryService: CategoryService,
    private brandService: BrandService,
    private productService: ProductService
  ) {}

  async ngOnInit() {
    await this.getCategories();
    await this.getBrands();
  }

  async getBrands() {
    await this.brandService.getBrands().then((response) => {
      this.brands = response;
    });
  }

  async getCategories() {
    await this.categoryService.getCategories().then((response) => {
      this.catogories = response;
    });
  }

  async uploadImage(file: any) {
    let data = new FormData();
    let imageId: any;
    data.append('image', file.target.files[0]);
    imageId = await this.productService
      .uploadImage(data)
      .then()
      .catch((err) => {
        console.log('Upload false' + err.status);
      });
    return imageId[0];
  }

  async uploadPreview(event: any) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      await reader.readAsDataURL(file);
      reader.onload = () => {
        return reader.result;
      };
    }
  }

  async uploadThumbnail(event: any) {
    let res = await this.uploadPreview(event);
    console.log(res);
  }

  uploadImages(event: any) {
    let image: any;
    console.log(event.target.files);

    let reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {
      let tempFiles: any = event.target.files;
      Array.from(tempFiles).forEach((file: any) => {
        reader.readAsDataURL(file);
        reader.onload = () => {
          image.push(reader.result);
          console.log(image);
        };
      });
    }
  }
}
