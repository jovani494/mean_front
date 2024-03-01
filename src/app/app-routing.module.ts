import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceListComponent } from './admin/service/service-list/service-list.component';
import { ServiceDetailsComponent } from './admin/service/service-details/service-details.component';
import { ServiceCreateComponent } from './admin/service/service-create/service-create.component';
import { ServiceUpdateComponent } from './admin/service/service-update/service-update.component';
import { AppointmentsComponent } from './admin/appointments/appointments.component';

import { ClientListComponent } from './admin/client/client-list/client-list.component';

import { EtatListComponent } from './admin/etat/etat-list/etat-list.component';
import { EtatCreateComponent } from './admin/etat/etat-create/etat-create.component';

import { CreateEmployeComponent } from './admin/employe/create-employe/create-employe.component';
import { ListEmployeComponent } from './admin/employe/list-employe/list-employe.component';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardEmployeComponent } from './board-employe/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';

import { ServiceComponent } from './home/service/service.component';
import { ViewComponent } from './home/service/view/view.component';
import { EquipeComponent } from './home/equipe/equipe.component';
import { MyAppointmentsComponent } from './home/my-appointments/my-appointments.component';

import { ProfileEmpComponent } from './employe/profile/profileEmp.component';
import { EmploiDuTempsComponent } from './employe/emploi-du-temps/emploi-du-temps.component';
import { EdtCreateComponent } from './employe/emploi-du-temps/edt-create/edt-create.component';
import { MytasksComponent } from './employe/mytasks/mytasks.component';

import { AppointmentCreateComponent } from './home/appointment-create/appointment-create.component';

const routes: Routes = [
  { path: 'admin', component: BoardAdminComponent , children : [
            //route service
        {path:"service", component: ServiceListComponent},
        {path:"service/detail/:id", component: ServiceDetailsComponent},
        {path:"service/create", component: ServiceCreateComponent},
        {path:"service/update/:id", component: ServiceUpdateComponent},

        {path : "client", component: ClientListComponent},

        {path : "appointments", component : AppointmentsComponent},

              //route etat
        {path:"etat", component: EtatListComponent},
        {path:"etat/create", component: EtatCreateComponent},
        {path:"etat/update/:id", component: EtatCreateComponent},

              //route employés
        {path:"employe/create", component : CreateEmployeComponent},
        {path:"employe", component : ListEmployeComponent}  
    ]
  },

  //auth
  { path: '', component: HomeComponent , children : [
      
    ] 
  },

  {path : 'service', component : ServiceComponent },

  {path : 'service/:id', component : ViewComponent},

  {path : 'equipe', component : EquipeComponent},

  {path : 'appointment/:id', component : AppointmentCreateComponent },

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'profile', component: ProfileComponent },

  { path: 'user', component: BoardUserComponent , children : [
      {path : 'myappointments', component : MyAppointmentsComponent}
    ] 
  },

  { path: 'employe', component: BoardEmployeComponent , children : [
        {path : 'profile', component : ProfileEmpComponent},
        {path : 'edt', component : EmploiDuTempsComponent},
        {path : 'edt/create', component : EdtCreateComponent},
        {path : 'mytasks', component : MytasksComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
