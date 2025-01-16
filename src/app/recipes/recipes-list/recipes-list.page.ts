import { Component, inject, input, OnInit, Signal, ViewChild, viewChild, signal, ElementRef, effect } from '@angular/core';
import { I_Recipe } from 'src/app/shared/Models/I_Recipes';
import { HelperService } from 'src/app/shared/services/helperService/helper.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.page.html',
  styleUrls: ['./recipes-list.page.scss'],
})
export class RecipesListPage implements OnInit {

  public helperService = inject(HelperService);

  public recipes = input.required<I_Recipe[]>();
  public tooltipPopup = viewChild('tooltipPopup', {
    read: ElementRef,
  });

  protected activeTooltip: string = '';
  protected isOpen = <boolean>false;

  constructor() {
    effect(() => console.log('signal recipes ', this.recipes()));
  }

  ngOnInit() {

  }

  protected onShowTooltip(event: Event, indexTooltip: number) {
    switch (indexTooltip) {
      case 1:
        this.activeTooltip = 'Schwierigkeitsgrad';
        this._openPopup(event);
        break;
      case 2:
        this.activeTooltip = 'Muskelfaktor';
        this._openPopup(event);
        break;
      case 3:
        this.activeTooltip = 'Abnehmfaktor';
        this._openPopup(event);
        break;
    }
  }

  private _openPopup(event: Event) {
    this.isOpen = true;
    if (this.tooltipPopup()) {
      this.tooltipPopup()!.nativeElement.event = event;
       console.log('event', event)
    }
  }
}
