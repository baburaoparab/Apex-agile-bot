import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
import { TextSpeechComponent } from '../text-speech/text-speech.component';

    const routes: Routes = [
        {
            path: 'text-to-speech',
            component: TextSpeechComponent,
        },
        { path: '', redirectTo: '/text-to-speech', pathMatch: 'full' }
    ];

    @NgModule({
        imports: [
            RouterModule.forRoot(routes)
        ],
        exports: [
            RouterModule
        ],
        declarations: []
    })
    export class AppRoutingModule { }