import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {DragService} from "./drag-service";

@Directive({
  selector: '[myDraggable]'
})

export class DraggableDirective {
  constructor(private dragService: DragService) {}

  @HostBinding('draggable')
  get draggable() {
    return 'true';
  }

  @Input()
  set myDraggable(options: DraggableOptions) {
    if (options) {
      this.options = options;
    }
  }

  // @Output() dragStart = new EventEmitter();

  private options: DraggableOptions = {};

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    const { zone = 'zone', data = {} } = this.options;
    // this.dragStart.next(true);
    this.dragService.startDrag(zone);
    event.dataTransfer.setData('child', JSON.stringify(data));
  }
}

export interface DraggableOptions {
  zone?: string;
  data?: any;
}
