import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { WorkInProgress } from './pages/work-in-progress/work-in-progress';
import { NotFound } from './pages/not-found/not-found';
import { Octave } from './projects/octave/octave';
import { Snell } from './projects/snell/snell';

export const routes: Routes = [

    { path: '', component: Home },
    { path: 'home', component: Home },
    { path: 'my-projects/snell', component: Snell },
    { path: 'my-projects/octave', component: Octave },
    { path: 'my-projects/sophiatech-eat', component: WorkInProgress },
    { path: 'my-projects/skimaster', component: WorkInProgress },
    { path: 'my-projects/lets-go-biking', component: WorkInProgress },
    { path: 'my-projects/nas-home-server', component: WorkInProgress },
    { path: 'my-projects/esp32-marauder', component: WorkInProgress },
    { path: 'my-projects/sec-lab-iot-iam', component: WorkInProgress },
    
    { path: '**', component: NotFound },
];
