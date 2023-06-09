import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogService } from 'ontimize-web-ngx';
import { Products } from 'src/app/models/products';
import { Reserve } from 'src/app/models/reserve';
import { OResponse } from 'src/app/models/response';
import { ProductService } from 'src/app/services/product.service';
import { ReserveService } from 'src/app/services/reserve.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reserve-dialog',
  templateUrl: './reserve-dialog.component.html',
  styleUrls: ['./reserve-dialog.component.css']
})
export class ReserveDialogComponent implements OnInit {
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product: Products, units: string, totalImport: number },
    private userService: UserService,
    private reserveService: ReserveService,
    private productService: ProductService,
   private dialogRef: MatDialogRef<ReserveDialogComponent>,
    protected dialogService: DialogService,
  ) { }

  ngOnInit() {
  }

  close(msg: string) {
    this.dialogRef.close(msg);
  }
  
  reserveOK() {

    const currentUser = this.userService.getCurrentUser();
    const { product, units, totalImport } = this.data;
    let endDate: Date = new Date();
    endDate.setDate(endDate.getDate() + 15);
    let day: number = endDate.getDate();
    let month_: number = endDate.getMonth() + 1;
    let year_: number = endDate.getFullYear();
    let currentReserve = new Reserve(currentUser, product.id, Number(units), product.price, totalImport, endDate.getTime());
    

    this.reserveService.reserve(currentReserve).subscribe(
      ({ code }: OResponse) => {
        let part1: string = "";
        let part2: string = "";
        let part3: string = "";
        if (code !== 0) {
          this.dialogService.error("reservation error", "error when making the reservation");
          return
        }
        
        if (JSON.parse(localStorage.getItem("com.ontimize.web.volvoreta"))['lang'] == "es") {
          part1 = "Has reservado ";
          part2 = "Pasa a recoger tu pedido antes del ";
          part3 = + day + "-" + month_ + "-" + year_;
        } else {
          part1 = "You have reserved ";
          part2 = "Pick up your order before ";
          part3 = + year_ + "-" + month_ + "-" + day;
        }
        this.updateActive(product.id);
        this.close(part1 + units + " <b>" + product.name + "</b>. " + part2 + " <b>" + part3 +  "</b>. ");
      }
    );
    //this.reserveService.getReserveDate()
  }
  updateActive(id: number){
    this.productService.getById(id).subscribe(
      ({code, data}: OResponse) => {
        if (code !== 0) {
          this.dialogService.error("updated error", "error when making the reservation");
          return
        }
        if(Number (data[0].istock) === 0){
          this.productService.updateActive(id, false).subscribe();
        }
      }
    );
  }

}
