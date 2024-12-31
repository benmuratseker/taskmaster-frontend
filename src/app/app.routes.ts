import { Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path: "", component: ProjectComponent},
    {path: "register", component: RegisterComponent}
];
