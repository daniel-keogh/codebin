import { MimeUtils } from './mime.util';

const vowels = 'aeiou';
const consonants = 'bcdfghjklmnpqrstvwxyz';

export class RandomId {
  static generate(mimeType?: string, length: number = 12): string {
    let id = '';

    const first = Math.round(Math.random());

    for (let i = 0; i < length; i++) {
      if (i % 2 === first) {
        id += this.getConsonant();
      } else {
        id += this.getVowel();
      }
    }

    if (mimeType) {
      const ext = MimeUtils.findExtension(mimeType);

      if (ext) {
        return `${id}.${ext}`;
      }
    }

    return id;
  }

  private static getConsonant(): string {
    return consonants[this.randomIndex(consonants)];
  }

  private static getVowel(): string {
    return vowels[this.randomIndex(vowels)];
  }

  private static randomIndex(str: string): number {
    return Math.floor(Math.random() * str.length);
  }
}
