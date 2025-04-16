
import React from 'react';
import { Dashboardtop } from '../components/Dashboardtop';
import SoundMonitor from '../components/soundmonitor';


export function Dashboard() {
  return (
    <>
      <div>
      <Dashboardtop />
      <div className='h-40'></div>
      <SoundMonitor />
      </div>
    </>
  );
}
