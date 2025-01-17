import { Component, OnInit, input } from '@angular/core';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-basis-layout',
  templateUrl: './basis-layout.component.html',
  styleUrls: ['./basis-layout.component.scss'],
})
export class BasisLayoutComponent implements OnInit {

  headline = input.required<string>();

  protected translucent: boolean = true;

  constructor(
    private readonly _platform: Platform,
  ) {}

  ngOnInit() {
    this._initComponent();
  }


  private _initComponent(): void {
    this._platform.is('ios') ? this.translucent = false :   this.translucent = true;
  }

  vibrateTest1() {
    const canVibrate = ('vibrate' in navigator);
    if (canVibrate) {
      window.navigator.vibrate(100);
      alert(true)
    } else {
      alert(false)
    }
  }

  vibrateTest2() {
  }
  vibrateStop() {
  }

}

// npm i cordova-plugin-vibration
// @ionic-native/vibration
// ionic cap sync
