import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { gainFileuil, gainParent } from './spin-circle.data';

@Component({
  selector: 'app-spin-circle',
  templateUrl: './spin-circle.component.html',
  styleUrls: ['./spin-circle.component.scss'],
})
export class SpinCircleComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  textCircleCenter: string = '';

  showSpinCircle: boolean = true;

  gainFromBackendValue!: number;
  @Input()
  set gainFromBackend(value: number) {
    if (value) {
      this.gainFromBackendValue = value;
    }
  }

  distance = 0;

  gain!: number;

  @Input()
  isFileul!: boolean;

  stopSpin: boolean = true;
  degreeNumber: number = 2400;

  @Input()
  set stopSpinCircle(value: boolean) {
    if (value && value !== null && value !== undefined) {
      this.stopSpin = value;
    }
  }

  runSpinCircle: boolean = true;
  myInterval: any;

  @Output()
  runSpinClicked: EventEmitter<any> = new EventEmitter();

  parts: any[] = [];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setNearestText();
    this.parts = this.isFileul ? gainFileuil : gainParent;
  }

  doElementsOverlap(element1: HTMLElement, element2: HTMLElement) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }

  isSelected(id: string): boolean {
    const elt2 = document.querySelector(`#${id}`) as HTMLElement;
    const elt1 = document.querySelector('#selected-gain') as HTMLElement;
    return this.doElementsOverlap(elt2, elt1);
  }

  setNearestText() {
    const element: HTMLElement | null =
      document.querySelector('#selected-gain');
    this.gain = +this.findNearestNumberTextToElement(element);
  }

  findNearestNumberTextToElement(targetElement: any) {
    const targetRect = targetElement.getBoundingClientRect();
    const targetX = targetRect.left + targetRect.width / 2;
    const targetY = targetRect.top + targetRect.height / 2;
    const textNodes = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
      // false
    );
    let nearestNumberText = '';
    let nearestDistance = Infinity;
    let distance = 0;
    while (textNodes.nextNode()) {
      const textNode = textNodes.currentNode;
      const text = textNode.textContent?.trim();
      if (text) {
        if (text.length > 0 && /\d+/.test(text)) {
          const textRect = textNode?.parentElement?.getBoundingClientRect();
          const textX = (textRect?.left ?? 0) + (textRect?.width ?? 0) / 2;
          const textY = (textRect?.top ?? 0) + (textRect?.height ?? 0) / 2;
          distance = Math.sqrt((targetX - textX) ** 2 + (targetY - textY) ** 2);
          if (distance < nearestDistance) {
            nearestNumberText = text;
            nearestDistance = distance;
          }
        }
      }
    }
    this.distance = nearestDistance;
    return nearestNumberText;
  }

  handleRunSpinCircle() {
    this.runSpinCircle = !this.runSpinCircle;
    this.executeSpinCircle();
    this.runSpinClicked.emit();
  }

  setSpinCircleStatus(status: SpinStatus) {
    let container = document.querySelector('.container') as HTMLElement;
    if (container) {
      container.style.animationPlayState = status;
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.myInterval);
  }

  ngAfterViewInit() {}

  rotateCircle() {
    let container = document.querySelector('.container') as HTMLElement;
    let btn = document.getElementById('spin');
    let number = 1200;
    if (container) {
      container.style.animation = 'spin 2s linear infinite';
    }
  }

  executeSpinCircle() {
    this.myInterval = setInterval(() => {
      this.setNearestText();
      if (
        this.gainFromBackendValue &&
        this.gainFromBackendValue == this.gain &&
        this.distance < 57
      ) {
        this.setSpinCircleStatus(SpinStatus.PAUSED);
        clearInterval(this.myInterval);
      }
      console.log('distance === ', this.distance);
    }, 10);
    this.setSpinCircleStatus(SpinStatus.RUNNING);
  }

  getStyle(index: number, color: string): string {
    const stepCount = 360 / this.parts.length;
    const width = (2 * 3.14 * 400) / this.parts.length;
    const left = this.isFileul ? `260` : `228`;
    const degValue = stepCount * (index + 1);
    let style = `transform: rotate(${degValue}deg);`;
    style += `background-color: ${color} !important;`;
    style += `width : ${width}px !important;`;
    style += `left: ${left}px !important`;

    return style;
  }
}

export enum SpinStatus {
  PAUSED = 'paused',
  RUNNING = 'running',
}
