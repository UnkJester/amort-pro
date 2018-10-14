import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatCardModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatFormFieldModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatFormFieldModule],
})
export class MaterialModule { }
