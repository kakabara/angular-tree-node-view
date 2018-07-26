import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'tree',
  styles: [
    `
      .tree {
        diplay: flex;
        flex-direction: column;
      }
      .control-size {
        position: absolute;
        top: 10px;
        left: 10px;
      }
    `
  ],
  template: `
    <div class="tree">
      <div class="control-size">
      <div (click)="incrementSize()">
        Плюс
      </div>
      <div (click)="dicrementSize()">
        Минус
      </div>
      </div>
      <tree-node *ngIf="data" [nodeSetting]="nodeSetting" [nodeTree]="data[0]" (moved)="moveNodes($event)"></tree-node>
    </div>
  `,
})
export class MyComponent implements OnInit {
  linearData = [
    {
      id: 1,
      name: 'qwe',
      parentID: null,
      childrenIds: [2, 3],
      children: []
    },
    {
      id: 2,
      name: 'rty',
      parentID: 1,
      childrenIds: [4],
      children: []
    },
    {
      id: 3,
      name: 'uio',
      parentID: 1,
      childrenIds: [5, 6, 7],
      children: []
    },
    {
      id: 4,
      name: 'asd',
      parentID: 2,
      childrenIds: [],
      children: []
    },
    {
      id: 5,
      name: 'fgh',
      parentID: 3,
      childrenIds: [],
      children: []
    },
    {
      id: 6,
      name: 'jkl',
      parentID: 3,
      childrenIds: [],
      children: []
    },
    {
      id: 7,
      name: 'zxc',
      parentID: 3,
      childrenIds: [8],
      children: []
    },
    {
      id: 8,
      name: 'vbn',
      parentID: 8,
      childrenIds: [],
      children: []
    }
  ];
  nodeSetting = {width: 100, height: 50, ext: 'px'};
  data = null;
  static convertLinearToHierarchical(data) {
    data.forEach( (node) => {
      node['children'] = [];
    });
    const hierarchicalData = data;
    hierarchicalData.forEach( (node) => {
      const parentNode = hierarchicalData.find((hNode) => hNode.id === node.parentID);
      if (parentNode) {
        parentNode.children.push(node);
      }
    });
    return hierarchicalData.filter( (node) => node.parentID === null);
  }

  public ngOnInit() {
    this.data = MyComponent.convertLinearToHierarchical(this.linearData);
    console.log(this.data);
  }

  moveNodes(event) {
    const {child, parent} = event;
    const oldParent = this.linearData.find((node) => node.id === child.parentID);
    oldParent.children.splice(oldParent.children.findIndex((node) => node.id === child.id), 1);
    parent.children.push(child);
    console.log(event);
  }
  incrementSize() {
    this.nodeSetting.width += 20;
    this.nodeSetting.height = Math.round(this.nodeSetting.width / 2);
  }

  dicrementSize() {
    this.nodeSetting.width -= 20;
    this.nodeSetting.height = Math.round(this.nodeSetting.width / 2);
  }

  onDrop(data: any) {
    alert(`dropped: ${data}`);
  }
}
