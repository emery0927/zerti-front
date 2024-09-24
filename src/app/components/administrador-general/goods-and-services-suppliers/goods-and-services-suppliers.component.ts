import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-goods-and-services-suppliers',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatTabsModule],
  templateUrl: './goods-and-services-suppliers.component.html',
  styleUrls: ['./goods-and-services-suppliers.component.css']
})
export class GoodsAndServicesSuppliersComponent {

}
