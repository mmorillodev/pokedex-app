import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { ModalPageRoutingModule } from './modal-routing.module';

import { ModalPage } from './modal.page';
import { ProgressBarPageModule } from '../progress-bar/progress-bar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPageRoutingModule,
    ProgressBarPageModule,
    HttpClientModule
  ],
  declarations: [ModalPage]
})
export class ModalPageModule {}
