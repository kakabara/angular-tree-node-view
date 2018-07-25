import {Component, Input} from "@angular/core";

@Component({
  selector: 'tree-node',
  template: `    
        <div class="line-to"></div>
        <div  myDropTarget (myDrop)="onDrop($event)" [myDraggable]="{data: nodeTree.name}" class="draggable center rect">{{nodeTree.name}}</div>
        <div *ngIf="nodeTree.children.length" class="center flex-container ">
          <tree-node *ngFor="let ch of nodeTree.children" [nodeTree]="ch" ></tree-node>
        </div>
  `,
  styles: [
    `      
      .flex-container {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
      }
      .rect {
        font-size: 15px;
        border-radius: 2px;
        margin: 0 auto;
        margin-top:60px;
      }
      .rect::before {
        content: "";
        width: calc(50% - 1px);
        position: relative;
        height: 100px;
        left: calc(50%);
        top: -30px;
        border-right: 1px solid #dadada;
      }

      /*.flex-container::before {*/
        /*content: "";*/
        /*width: calc(50% - 1px);*/
        /*position: relative;*/
        /*height: 30px;*/
        /*top: 30px;*/
        /*left: calc(50%);*/
        /*border-right: 1px solid #dadada;*/
      /*}*/
      .center {
        justify-content: center;
      }
    .draggable {
      border: 1px solid #ccc;
      padding: 1rem;
      width: 6rem;
      cursor: move;
    }
    `],
})

export class NodeComponent {
  @Input() nodeTree: any;
  onDrop(data: any) {
    alert(`dropped: ${data}`);
  }
}
