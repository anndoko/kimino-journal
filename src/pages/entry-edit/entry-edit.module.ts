import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntryEditPage } from './entry-edit';

@NgModule({
  declarations: [
    EntryEditPage,
  ],
  imports: [
    IonicPageModule.forChild(EntryEditPage),
  ],
})
export class EntryEditPageModule {}
