import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PipesModule } from '../core/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  declarations: [
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  providers: [
  ],
  entryComponents: []
})
export class SharedModule { }
