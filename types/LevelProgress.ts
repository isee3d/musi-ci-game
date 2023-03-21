import { Fragment } from './Fragment';

/** For backend */
export interface LevelProgress {
  id: string;
  levelId: string;
  correctAnswerData: [
    {
      fragmentId: Fragment['id'];
      /** time in ms, later used for enhanced score system */
      answerTime: number;
    }
  ];
}
