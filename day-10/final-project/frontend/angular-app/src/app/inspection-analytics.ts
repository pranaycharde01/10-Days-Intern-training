import {
    ChangeDetectorRef,
    Component,
    OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';

@Component({
    selector: 'app-inspection-analytics',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './inspection-analytics.html',
    styleUrl: './inspection-analytics.css'
})
export class InspectionAnalyticsComponent
    implements OnInit {

    stats: any = null;
    inspections: any[] = [];

    loading = true;
    error = '';

    constructor(
        private apiService: ApiService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.loadAnalytics();
    }

    loadAnalytics(): void {
        this.loading = true;
        this.error = '';

        this.apiService
            .getInspectionAnalytics()
            .subscribe({
                next: (response) => {
                    console.log(
                        'Dashboard API response:',
                        response
                    );

                    this.stats = response.data;

                    this.apiService
                        .getInspections()
                        .subscribe({
                            next: (inspectionResponse) => {
                                console.log(
                                    'Inspections API response:',
                                    inspectionResponse
                                );

                                this.inspections =
                                    inspectionResponse.data;

                                this.loading = false;

                                console.log(
                                    'Loading:',
                                    this.loading
                                );

                                this.changeDetectorRef.detectChanges();
                            },

                            error: (error) => {
                                console.error(
                                    'Inspections API error:',
                                    error
                                );

                                this.error =
                                    'Unable to load inspection records.';

                                this.loading = false;

                                this.changeDetectorRef.detectChanges();
                            }
                        });
                },

                error: (error) => {
                    console.error(
                        'Dashboard API error:',
                        error
                    );

                    this.error =
                        'Unable to load inspection analytics.';

                    this.loading = false;

                    this.changeDetectorRef.detectChanges();
                }
            });
    }

    getCompletedCount(): number {
        return this.inspections.filter(
            (inspection) =>
                inspection.status === 'Completed'
        ).length;
    }

    getPendingCount(): number {
        return this.inspections.filter(
            (inspection) =>
                inspection.status === 'Pending'
        ).length;
    }

    getFailedCount(): number {
        return this.inspections.filter(
            (inspection) =>
                inspection.status === 'Failed'
        ).length;
    }
}
