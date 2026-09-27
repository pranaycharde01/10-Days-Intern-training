import { Routes } from '@angular/router';
import { InspectionAnalyticsComponent } from './inspection-analytics';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'inspection-analytics',
        pathMatch: 'full'
    },
    {
        path: 'inspection-analytics',
        component: InspectionAnalyticsComponent
    }
];
