import {Directive, EventEmitter, HostListener, Input, Output} from "@angular/core";
import {DragService} from "./drag-service";
import {DraggableOptions} from "./drag-directive";

@Directive({
  selector: '[myDropTarget]'
})
export class DropTargetDirective {
  constructor(private dragService: DragService) {}

  @Input()
  set myDropTarget(options: DropTargetOptions) {
    if (options) {
      this.options = options;
    }
  }

  @Output('myDrop') drop = new EventEmitter();

  private options: DropTargetOptions = {};

  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    const { zone = 'zone' } = this.options;

    if (this.dragService.accepts(zone)) {
      event.preventDefault();
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event) {
    const data = {
      child: JSON.parse(event.dataTransfer.getData('child')),
      parent: this.options['data']
    };
    if (data.child.id !== data.parent.id && data.child.parentID !== data.parent.id) {
      this.drop.next(data);
    }

  }
}

export interface DropTargetOptions {
  zone?: string;
}
