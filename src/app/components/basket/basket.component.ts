import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/models/products';
import { Subscription } from 'rxjs';
import { ProductsService } from './../../services/products.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  constructor(private ProductsService: ProductsService) {}
  basket: IProducts[];
  basketSubsription: Subscription;
  ngOnInit(): void {
    this.basketSubsription =
      this.ProductsService.getProductFromBasket().subscribe((data) => {
        this.basket = data;
      });
  }
  ngOnDestroy() {
    if (this.basketSubsription) this.basketSubsription.unsubscribe();
  }

  minusItemFromBasket(item: IProducts) {
    if (item.quantity === 1) {
      this.ProductsService.deleteProductFromBasket(item.id).subscribe(
        (data) => {
          let idx = this.basket.findIndex((data) => data.id === item.id);
          this.basket.splice(idx, 1);
        }
      );
    } else {
      item.quantity -= 1;
      this.ProductsService.updateProductToBasket(item).subscribe((data) => {});
    }
  }

  plusItemFromBasket(item: IProducts) {
    item.quantity += 1;
    this.ProductsService.updateProductToBasket(item).subscribe((data) => {});
  }
}
