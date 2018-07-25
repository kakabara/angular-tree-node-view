import {Component} from "@angular/core";

@Component({
  selector: 'my-app',
  styles: [
    `
      .flex-container {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
      }
      .line-top {
        
      }
    `
  ],
  template: `
    <div class="flex-container"></div>
    <tree-node [nodeTree]="data"></tree-node>
  `,
})
export class MyComponent {
  data = {name: 'qwe',
  children: [{
    name: 'asd',
    children: [
      {
      name: '123',
      children: []
      },
      {
        name: '456',
        children: []
      }]
  },
    {
      name: 'zxc',
      children: []
    }]};
  onDrop(data: any) {
    alert(`dropped: ${data}`);
  }
}
