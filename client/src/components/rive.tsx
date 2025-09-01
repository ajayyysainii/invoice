"use client"
import { useRive,Layout, Fit } from '@rive-app/react-canvas';

  
  // With `useRive` Hook:
  export default function Simple() {
    const {rive, RiveComponent } = useRive({
      src: 'kbar.riv',
      animations: 'Timeline 1',
      autoplay: true,
      layout: new Layout({ fit: Fit.FitHeight }),
      stateMachines: "State Machine 1"
      
    });
  
   

    return <RiveComponent style={{ width: '100%', height: '100%' }} onMouseOver={() => rive && rive.play()} />;
  }