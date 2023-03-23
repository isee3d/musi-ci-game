import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixijs'

interface AnimationPlayerProps {
    width: number;
    height: number;
}

const AnimationPlayer: React.FC<AnimationPlayerProps> = ({ width, height }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [app, setApp] = useState<PIXI.Application | null>(null);
    const [count, setCount] = useState<number>(0);

    const timer = useRef(0);

    useEffect(() => {
        if (containerRef.current) {
            const newApp = new PIXI.Application({
                width,
                height,
                autoStart: true,
                backgroundColor: 0xffffff,
                view: containerRef.current.querySelector('canvas') as HTMLCanvasElement,
                antialias: true
            });
            newApp.stage.interactive = true;
            newApp.stage.scale.y = -1;
            newApp.stage.position.y = newApp.renderer.height;
            setApp(newApp);

            containerRef.current.appendChild(newApp.view as unknown as Node);

            const h = newApp.view.height;
            const w = newApp.view.width;

            const line = new PIXI.Graphics();
            line.lineStyle(5, 0x808080);
            line.moveTo(0, height / 2);
            line.lineTo(width, height / 2);
            newApp.stage.addChild(line);

            const ellipse = new PIXI.Graphics();

            newApp.stage.addChild(line);
            newApp.stage.addChild(ellipse);

            newApp.ticker.add(() => {
                timer.current += newApp.ticker.deltaMS / 1000;
                // setCount(newCount);

                ellipse.clear();
                ellipse.beginFill(0x4490e6);
                ellipse.drawEllipse((width / 10) * timer.current, h / 2, 11, 11);
                ellipse.endFill();
            });
        }

        return () => {
            if (app) {
                app.destroy();
                setApp(null);
            }
        };
    }, []);

    return <div ref={ containerRef } />;
};

export default AnimationPlayer;
