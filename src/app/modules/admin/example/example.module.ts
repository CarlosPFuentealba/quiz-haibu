import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Route, RouterModule } from '@angular/router';
import { SearchModule } from 'app/layout/common/search/search.module';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';



const exampleRoutes: Route[] = [
    {
        path     : '',
        component: ExampleComponent
    }
];

@NgModule({
    declarations: [
        ExampleComponent,
        EmployeeDetailComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        NgxDatatableModule,
        MatIconModule,
        MatCheckboxModule,
        MatMenuModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        SearchModule,
        CommonModule,
    ]
})
export class ExampleModule
{
}
