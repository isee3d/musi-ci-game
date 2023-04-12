import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixijs'
import * as Tone from 'tone';
import { createApp, drawNotes } from '~/components/fragmentPlayer/audioService/PixiUtils';
import ToneJSUtils from '~/components/fragmentPlayer/audioService/ToneJSUtils';
import { KeyboardToNote } from '~/components/fragmentPlayer/audioService/Keyboard';
import AudioService from '~/components/fragmentPlayer/audioService/AudioService';
import { ToneJSService } from '~/components/fragmentPlayer/audioService/ToneJSService';
import { FragmentWithNotes } from '~/components/fragmentPlayer/audioService/fragmentWithNotes';
import { Note } from '@prisma/client';

interface AnimationPlayerProps {
    fragment: FragmentWithNotes;
    width: number;
    height: number;
}

const AnimationPlayer: React.FC<AnimationPlayerProps> = ({ fragment, width, height }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [app, setApp] = useState<PIXI.Application | null>(null);
    const count = useRef(0);
    const timer = useRef(0);

    useEffect(() => {
        if(containerRef.current) {

        const app = new PIXI.Application({
            width,
            height,
            autoStart: true,
            backgroundColor: 0xffffff,
            view: containerRef.current.querySelector('canvas') as HTMLCanvasElement,
            antialias: true
        });
        app.stage.interactive = true;
        app.stage.scale.y = -1;
        app.stage.position.y = app.renderer.height;
        setApp(app);
        // const renderer = app.renderer;
        containerRef.current.appendChild(app.view as unknown as Node);
        app.stage.addChild(drawNotes(fragment.notes, width, height));
        resizeWindow();
        window.addEventListener('resize', () => resizeWindow());
        addAnimation(fragment.notes);
    }
        return () => {
            if (app) {
                app.destroy();
                setApp(null);
            }
        };
    }, []);

    const addAnimation = (notes: Note[]): void => {
        if (!app) return;
        const h = app.view.height;
        const w = app.view.width;
        const sceneDuration = ToneJSUtils.getFragmentDurationInTicks(notes);
        const pxPerTick = w / sceneDuration;
        const range = KeyboardToNote.octaves * 12;
        const noteHeight = h / range;

        const ellipse = new PIXI.Graphics();

        const graphics = new PIXI.Graphics();
        const line = graphics.moveTo(0, 0);
        line.lineStyle(2, 0xff0000, 0.8);
        line.moveTo(0, 0);
        // line.lineTo(0, h);
        app.stage.addChild(graphics);
        app.stage.addChild(ellipse);

        app.ticker.add(() => {
            if (!app) return;

            // delta Ticks/ms
            // ik heb BPM / 60000 = B/MS
            // TicksPerBeat (TPB) = Ticks/B || Transport.PPQ
            // Ticks/MS = (B/MS) * (T/B)
            const dTicksMs = (AudioService.bpm / 60000) * AudioService.PPQ;
            // const { practiceEnabled } = props;
            const status = ToneJSService.getStatus();
            const fragment = ToneJSService.getCurrentFragment();

            ellipse.clear();

            if (status === 'metronome') {
                count.current = 0;
                timer.current = 0;
                return;
            }

            // resets to 0 if this animation does not belong to the current fragment being played in practice mode
            // eslint-disable-next-line react/destructuring-assignment
            // if (fragment?.id !== props.fragment.id) {
                // if (practiceEnabled) {
                //     count = 0;
                //     timer = 0;
                //     return;
                // }
            // }

            if (status === 'stopped' || !fragment) {
                count.current = 0;
                timer.current = 0;
                ellipse.clear();
                return;
            }

            // count += app.ticker.deltaMS;
            timer.current += app.ticker.deltaMS;
            count.current += app.ticker.deltaMS * dTicksMs;
            ellipse.clear();

            const now = timer.current / 1000; // seconds

            // get Y from note interpolation
            for (let i = 0; i < notes.length; i += 1) {
                const n = notes[i] as Note;
                const noteStart = Tone.Ticks(n.time).toSeconds();
                const noteEnd = noteStart + Tone.Ticks(n.duration).toSeconds();

                if (now >= noteStart && now <= noteEnd) {
                    const yIndex = KeyboardToNote.getIndexFromNote(n.name);
                    ellipse.beginFill(0x4490e6);
                    ellipse.drawEllipse(pxPerTick * count.current, yIndex * noteHeight - 1, 11, 11);
                    ellipse.endFill();
                }
                // toneHeight
            }
        });
    };

    const resizeWindow = (): void => {
        if(!app) return;
        if(containerRef.current){
            const { clientWidth, clientHeight } = containerRef.current;
            app.renderer.resize(clientWidth, clientHeight);
        }
    };

    return <div id={fragment.id.toString()} ref={ containerRef } />;
};

export default AnimationPlayer;
