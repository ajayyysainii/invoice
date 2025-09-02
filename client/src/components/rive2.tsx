"use client"
import { useRive, Fit, Layout,Alignment  } from '@rive-app/react-canvas';
import { useEffect } from 'react';

export default function Simple1() {
    const { rive, RiveComponent } = useRive({
        src: '/apap.riv',
        stateMachines: 'State Machine 1',
        autoplay: true,
        onLoad: () => {
    rive?.resizeDrawingSurfaceToCanvas();
    
  },
         layout: new Layout({
      fit: Fit.None,
            alignment: Alignment.TopLeft,
    }),
        
    });

    // Log available content for debugging
    useEffect(() => {
        if (rive) {
            console.log('Rive contents:', rive.contents);
            console.log('Available state machines:', rive.stateMachineNames);
        }
    }, [rive]);

    return (
        <div style={{ width: "100vw", height: "100vh" }} >
            <RiveComponent
                onMouseOver={() => rive && rive.play()}
            />

        </div>
    );
}