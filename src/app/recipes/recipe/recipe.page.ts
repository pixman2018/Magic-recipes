import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { I_Recipe } from 'src/app/shared/Models/I_Recipes';
import { HelperService } from 'src/app/shared/services/helperService/helper.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
  /**
   *
   * @memberof TrainingStartListPage
   * @description
   * displays the details of a recipe and supports the user
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
  private _route = inject(ActivatedRoute);
  public helperService = inject(HelperService);
  /*
   ********************************************************************************
   * signals
   ********************************************************************************
   */
  protected recipe = signal<I_Recipe | null>(null);
  public tooltipPopup = viewChild('tooltipPopup', {
    read: ElementRef,
  });

  protected activeTooltip: string = '';
  protected isOpen = <boolean>false;

  constructor() {}

  ngOnInit() {
    this.recipe.set(this._route.snapshot.data['recipe']);
  }

  /*
   ********************************************************************************
   *****
   ***
   * tooltip
   ***
   *****
   ********************************************************************************
   */

  /**
   *
   * @protected
   * @param event
   * @param indexTooltip
   * @memberof RecipePage
   *
   * @description
   * sets the tooltip text to be displayed in the 'activeTooltip' property
   * and starts the method '_openPopup(event)'
   *
   */
  protected onShowTooltip(event: Event, indexTooltip: number): void {
    switch (indexTooltip) {
      case 0:
        this.activeTooltip = 'Kochzeit/ Arbeitszeit';
        this._openPopup(event);
        break;
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
   * @memberof RecipePage
   *
   * @description
   * sets the property 'isOpen' to true
   * and sets the value for the 'tooltipPopup' signal
   * with the value of the 'event' property
   */
  private _openPopup(event: Event): void {
    this.isOpen = true;
    if (this.tooltipPopup()) {
      this.tooltipPopup()!.nativeElement.event = event;
    }
  }
}
