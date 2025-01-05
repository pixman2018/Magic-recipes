import { Pipe, PipeTransform } from '@angular/core';

/**
 *
 * @memberof UcfirstPipe
 * @description
 * Capitalizes the first letter in the default setting.
 * If the flag is set to “allFirstLetter”, every first letter is capitalized
 *
 * @methods
 * transform(letter, “allFirstLetter”, isDebug)
 * _ucFirstByArray(strSplit: string[])
 *
 */

@Pipe({
  name: 'ucfirst',
})
export class UcfirstPipe implements PipeTransform {

  /**
   *
   * @public
   * @param string
   * @param allFirstLetter
   * @param isDebug
   * @returns string
   * @memberof UcfirstPipe
   *
   * @description
   * Capitalizes the first letter in the default setting.
   * If the flag is set to “allFirstLetter”, every first letter is capitalized.
   * Blank strings and hyphens are supported
   *
   */
  transform(
    string: string | undefined,
    allFirstLetter: boolean = false,
    isDebug: boolean = false
  ): string {
    // if string empty then return empty
    if (string && string.length > 0) {
      if (isDebug) {
        console.log('string', string, string.includes(' '), allFirstLetter);
      }

      let str: string = '';
      if (allFirstLetter) {
        if (string.includes(' ')) {
          const strSplit: string[] = string.split(' ');
          str = this._ucFirstByArray(strSplit).join(' ');
        } else if (string.includes('-')) {
          const strSplit: string[] = string.split('-');
          str = this._ucFirstByArray(strSplit).join('-');
        } else if (string.includes(' ')) {
          const strSplit: string[] = string.split(' ');
          str = this._ucFirstByArray(strSplit).join(' ');
        } else {
          str =
            string.substring(0, 1).toUpperCase() +
            string.substring(1).toLowerCase();
        }
      } else {
        str = string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();
      }
      return str;
    } else {
      return '';
    }
  }

    /**
   *
   * @public
   * @param strSplit[]
   * @returns strSplit[]
   * @memberof UcfirstPipe
   *
   * @description
   * goes through the array of the edited string in a loop
   * and capitalizes every first letter
   *
   */
  private _ucFirstByArray(strSplit: string[]): string[] {
    for (let i = 0; i < strSplit.length; i++) {
      strSplit[i] =
        strSplit[i].substring(0, 1).toUpperCase() +
        strSplit[i].substring(1).toLowerCase();
    }
    return strSplit;
  }
}

/*
 // first version
  transform(string: string | undefined): string {
    if (string && string.length > 0) {
      return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();
    } else {
      return '';
    }

  }
*/
