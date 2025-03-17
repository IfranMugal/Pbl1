
import React from 'react';
import { Dashboardtop } from '../components/Dashboardtop';
import SoundMonitor from '../components/soundmonitor';


export function Dashboard() {
  return (
    <>
      <Dashboardtop />
      <br />
      <SoundMonitor />
    </>
  );
}
