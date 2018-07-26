import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'tree-node',
  template: `
    <div class="node">
        <div class="draggable rect"
             [ngStyle]="{'width': nodeSetting.width + nodeSetting.ext, 'height': nodeSetting.height + nodeSetting.ext}"
             [myDropTarget]="{data: nodeTree}"
             [myDraggable]="{data: nodeTree}"
             (click)="clicked()"
             (myDrop)="onDrop($event)"
             (dragstart)="hideChild()"
             (dragend)="clicked()">
          <div class="top-control">
            <div class="btn-add-rule">
              R
            </div>
            <div class="btn-delete-node">
              x
            </div>
          </div>
          {{nodeTree.name}}
          <div class="bottom-control">
            <div class="btn-add-child">
            +
            </div>
            <div class="children-count">
              [{{nodeTree.children.length}}]
            </div>
          </div>
        </div>
        <div *ngIf="viewChild()" class="line-to-children"></div>
        <div *ngIf="viewChild()" class="flex-container">
          <tree-node class="node-component" *ngFor="let ch of nodeTree.children"
                     [nodeSetting]="nodeSetting"
                     [nodeTree]="ch" (moved)="onDrop($event)"></tree-node>
        </div>
    </div>
  `,
  styles: [
    `
      .top-control {
        position: absolute;
        top: 0;
        left: 0;
        width: 101%;
        display: inline-block;
      }
      
      .top-control > .btn-add-rule {
        position: absolute;
        left: 0;
      }
      .top-control > .btn-delete-node {
        position: absolute;
        right: 0;
      }
      
      .bottom-control {
        position: absolute;
        top: calc(100% - 2%);
        left: 0;
        width: 101%;
        display: inline-block;
      }
      
      .bottom-control > .btn-add-child {
        position: absolute;
        left: 0;
      }
      .bottom-control > .children-count {
        position: absolute;
        right: 0;
      }
      .node {
        display: flex;
        flex-direction: column;
      }
      .node-component:first-child:before {
        content: "";
        width: calc(50% - 1px);
        position: relative;
        display: inline-block;
        left: calc(50%);
        border-top: 1px solid #dadada; 
      }
      .node-component:before {
        content: "";
        width: calc(100%);
        position: relative;
        display: inline-block;
        border-top: 1px solid #dadada;
      }
      .node-component:last-child:before {
        content: "";
        width: calc(50% - 1px);
        position: relative;
        display: inline-block;
        right: calc(50%);
        left: 0;
        border-top: 1px solid #dadada;
      }
      .node-component:only-child:before {
        display: none;
      }
      .flex-container {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-self: center;
      }
      .rect {
        position: relative;
        font-size: 15px;
        border-radius: 2px;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 15px;
        align-self: center;
      }
      .rect:before {
        content: "";
        width: calc(50% - 1px);
        position: relative;
        height: 30px;
        left: calc(50%);
        top: -30px;
        border-right: 1px solid #dadada;
      }
      .line-to-children:before {
        content: "";
        width: calc(50% - 1px);
        position: relative;
        height: 100px;
        left: calc(50%);
        border-right: 1px solid #dadada;
      }
      .draggable {
        border: 1px solid #ccc;
        padding: 1rem;
        width: 50px;
        height: 50px;
        cursor: move;
      }
    `],
})

export class NodeComponent {
  public isOpened = true;
  @Input() nodeTree: any;
  @Input() nodeSetting;
  @Output() moved: EventEmitter<any> = new EventEmitter();

  viewChild () {
    return this.nodeTree.children.length && this.isOpened;
  }

  clicked () {
    this.isOpened = !this.isOpened;
  }

  hideChild () {
    this.isOpened = false;
  }

  onDrop(data: any) {
    this.moved.next(data);
  }
}
