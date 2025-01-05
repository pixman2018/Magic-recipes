import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitenavigationComponent } from './components/ionic_tmp/sitenavigation/sitenavigation.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { BasisLayoutComponent } from './content/basis-layout/basis-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { UcfirstPipe } from './pipes/ucFirst/ucfirst.pipe';

const components = [
  SitenavigationComponent,
  BasisLayoutComponent,
  FooterComponent,
];

const pipes = [
  UcfirstPipe,
];

@NgModule({
  declarations: [...components, ...pipes,],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule,
  ],
  exports: [...components, ...pipes,]
})
export class SharedModule { }
