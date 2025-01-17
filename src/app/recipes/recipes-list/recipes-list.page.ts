import {
  Component,
  inject,
  input,
  viewChild,
  ElementRef,
  effect,
} from '@angular/core';
import { I_Recipe } from 'src/app/shared/Models/I_Recipes';
import { HelperService } from 'src/app/shared/services/helperService/helper.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.page.html',
  styleUrls: ['./recipes-list.page.scss'],
})
export class RecipesListPage  {
  /**
   *
   * @memberof RecipesListPage
   * @description
   * Outputs all recipes that come from the “Home Page”
   * and supports the user
   * with the tooltip while reading
   *
   * @methods
   * tooltip
   *  onShowTooltip(event: Event, indexTooltip: number): void
   * private _openPopup(event: Event): void
   *
   */

  /*
   ********************************************************************************
   * DI
   ********************************************************************************
   */
  public helperService = inject(HelperService);
  /*
   ********************************************************************************
   * signals
   ********************************************************************************
   */
  public recipes = input.required<I_Recipe[]>();
  public tooltipPopup = viewChild('tooltipPopup', {
    read: ElementRef,
  });

  protected activeTooltip: string = '';
  protected isOpen = <boolean>false;

  constructor() {
    effect(() => console.log('signal recipes ', this.recipes()));
  }

  /**
   *
   * @protected
   * @param event
   * @param indexTooltip
   * @memberof RecipesListPage
   *
   * @description
   * sets the tooltip text to be displayed in the 'activeTooltip' property
   * and starts the method '_openPopup(event)'
   *
   */
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
  /**
   *
   * @protected
   * @param event
   * @memberof RecipesListPage
   *
   * @description
   * sets the property 'isOpen' to true
   * and sets the value for the 'tooltipPopup' signal
   * with the value of the 'event' property
   */
  private _openPopup(event: Event) {
    this.isOpen = true;
    if (this.tooltipPopup()) {
      this.tooltipPopup()!.nativeElement.event = event;
      console.log('event', event);
    }
  }
}
