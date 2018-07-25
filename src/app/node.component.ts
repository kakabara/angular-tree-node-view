import {Component, Input} from "@angular/core";

@Component({
  selector: 'tree-node',
  template: `
    <div>
        <div class="line-top"></div>
        <div  myDropTarget (myDrop)="onDrop($event)" [myDraggable]="{data: nodeTree.name}" class="draggable center rect">{{nodeTree.name}}</div>
        <div *ngIf="nodeTree.children.length" class="center flex-container">
          <tree-node *ngFor="let ch of nodeTree.children" [nodeTree]="ch" ></tree-node>
        </div>
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
        margin-top:30px;
        width: 6rem;
      }
      .rect::before {
        content: "";
        width: calc(50% - 1px);
        height: 30px;
        left: 0;
        top: -30px;
        border-right: 1px solid #dadada;
      }
      .center {
        justify-content: center;
      }
    .draggable {
      border: 1px solid #ccc;
      padding: 1rem;
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
