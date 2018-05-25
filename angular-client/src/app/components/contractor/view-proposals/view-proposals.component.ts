import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrentUser } from '../../../models/access/access.model';
import { AccessService } from '../../../services/access/access.service';

@Component({
    selector: 'view-proposals',
    templateUrl: './view-proposals.component.html',
    styleUrls: ['./view-proposals.component.scss']
})
export class ViewProposalsComponent implements OnInit, OnDestroy {

    private _currentUser: CurrentUser;
    private _inProcess: boolean = false;
    private _solicitudSelect: Object = { nameRequest: "No hay solicitudes creadas" }

    /**
     * ViewProposalsComponent Constructor
     * @param {AccessService} _accessService 
     */
    constructor(private _accessService: AccessService) {

    }

    ngOnInit() {
        this._currentUser = this._accessService.getCurrentUser();
    }

    ngOnDestroy() {

    }
}