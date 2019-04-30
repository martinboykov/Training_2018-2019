import { VULGAR_WORDS_ARRAY, VULGAR_WORDS_STRING } from './vulgar-words'

export class CustomValidator {
  // Check firstname for vulgar words
  static checkForVulgarWordsGoogle(firstnameCustom): any {
    const obj = { invalidFirstname: null }
    for (const word of VULGAR_WORDS_ARRAY) {
      const regexp = RegExp(`${word}`);
      console.log('.');
      if (regexp.test(firstnameCustom.value)) {
        console.log(word);
        obj.invalidFirstname = word;
        break;
      }
    }
    // VULGAR_WORDS_ARRAY.forEach(word => {
    //   const regexp = RegExp(`${word}`);
    //   console.log('.');

    //   if (regexp.test(firstname.value)) {
    //     console.log(word);
    //     obj.invalidFirstname = true;
    //   }
    // });
    // const obj = { invalidFirstname: false }
    // VULGAR_WORDS_ARRAY.forEach(word => {
    //   console.log('.');
    //   if (word === firstname.value) {
    //     obj.invalidFirstname = true;
    //     return obj;
    //   }
    // });

    if (obj.invalidFirstname === null)
      return null;
    else return obj
  }
}
