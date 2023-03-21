import { Fragment } from './Fragment';

export interface GameScene {
  fragments: Fragment[];
  answer: Fragment['id']; // het antwoord in de Scene,
  correct: boolean; // of het antwoord juist was
}
