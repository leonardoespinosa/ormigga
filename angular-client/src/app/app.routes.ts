import { Route } from '@angular/router';
import { SigninComponent } from './components/access/signin/signin.component';
import { LayoutComponent } from './components/navigation/layout/layout.component';
import { ViewProposalsComponent } from './components/contractor/view-proposals/view-proposals.component';

export const routes: Route[] = [
    {
        path: 'portal', component: LayoutComponent, children: [
            { path: 'view-proposals', component: ViewProposalsComponent }
        ]
    },
    { path: '', component: SigninComponent }
];