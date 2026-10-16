import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Snell } from './pages/snell/snell';
import { Octave } from './pages/octave/octave';
import { SophiatechEat } from './pages/sophiatech-eat/sophiatech-eat';
import { Skimaster } from './pages/skimaster/skimaster';
import { LetsGoBiking } from './pages/lets-go-biking/lets-go-biking';
import { NasHomeServer } from './pages/nas-home-server/nas-home-server';
import { Esp32Marauder } from './pages/esp32-marauder/esp32-marauder';
import { WorkInProgress } from './pages/work-in-progress/work-in-progress';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [

    { path: '', component: Home },
    { path: 'home', component: Home },
    { path: 'my-projects/snell', component: WorkInProgress },
    { path: 'my-projects/octave', component: WorkInProgress },
    { path: 'my-projects/sophiatech-eat', component: WorkInProgress },
    { path: 'my-projects/skimaster', component: Skimaster },
    { path: 'my-projects/lets-go-biking', component: WorkInProgress },
    { path: 'my-projects/skimaster', component: Skimaster },
    { path: 'my-projects/nas-home-server', component: WorkInProgress },
    { path: 'my-projects/esp32-marauder', component: WorkInProgress },
    
    { path: '**', component: NotFound },
];
