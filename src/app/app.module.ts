import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {MyComponent} from "./my.component";
import {DragService} from "./drag-service";
import {DropTargetDirective} from "./drop-target-directive";
import {DraggableDirective} from "./drag-directive";
import {NodeComponent} from "./node.component";


@NgModule({
  declarations: [
    AppComponent,
    MyComponent,
    DropTargetDirective,
    DraggableDirective,
    NodeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DragService],
  bootstrap: [AppComponent]
})
export class AppModule { }
