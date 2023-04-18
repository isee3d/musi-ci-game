import * as PIXI from 'pixijs';
import * as Tone from 'tone';
import ToneJSUtils from './ToneJSUtils';
import { KeyboardToNote } from '~/components/fragmentPlayer/audioService-legacy/Keyboard';
import { Note } from '@prisma/client';
// import { Note } from '~/components/fragmentPlayer/audioService/Note';


export interface PixiOptions {
  width: number;
  height: number;
}

export const createApp = (options: PixiOptions): PIXI.Application => {
  const app = new PIXI.Application({
    ...options,
    autoStart: true,
    antialias: true,
    backgroundAlpha: 0.5,
  });

  app.stage.position.y = app.renderer.height;
  app.stage.scale.y = -1;
  app.stage.interactive = true;
  return app;
};

// export const clearApp = () => {};

export const drawNotes = (notes: Note[], width: number, height: number): PIXI.Graphics => {
  const range = KeyboardToNote.octaves * 12;
  const noteHeight = height / range;

  if (!notes) {
    throw new Error('NO_NOTES_TO_DRAW');
  }
  const notesGraphics = new PIXI.Graphics();

  const sceneDuration = ToneJSUtils.getFragmentDurationInTicks(notes); // TODO, get from scene.

  const pxPerTick = width / sceneDuration;
  const color = 0xc1c1c1;
  // const polyLine = new PIXI.Graphics();
  // polyLine.lineStyle(3, 0xc1c1c1);

  for (let i = 0; i < notes.length; i += 1) {
    const note = notes[i];
    if (!note) continue;
    const tStart = Tone.Ticks(note?.time).toTicks() * pxPerTick;
    const tEnd = Tone.Ticks(note?.duration).toTicks() * pxPerTick;
    const radius = noteHeight / 2;
    // toneHeight
    const yIndex = KeyboardToNote.getIndexFromNote(note.name);
    notesGraphics.beginFill(color);
    notesGraphics.drawCircle(tStart + radius, yIndex * noteHeight, radius);
    notesGraphics.drawCircle(tEnd + tStart - radius, yIndex * noteHeight, radius);
    notesGraphics.drawRect(
      tStart + radius,
      yIndex * noteHeight - radius,
      tEnd - radius * 2,
      noteHeight
    );
    notesGraphics.endFill();
  }
  return notesGraphics;
};
