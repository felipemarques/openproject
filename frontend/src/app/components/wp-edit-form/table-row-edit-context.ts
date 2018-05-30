// -- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2015 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
// ++

import {Injector} from '@angular/core';
import {$qToken, $timeoutToken} from 'core-app/angular4-transition-utils';
import {SimpleTemplateRenderer} from '../angular/simple-template-renderer';
import {WorkPackageResource} from 'core-app/modules/hal/resources/work-package-resource';
import {States} from '../states.service';
import {CellBuilder, editCellContainer, tdClassName} from '../wp-fast-table/builders/cell-builder';
import {WorkPackageTableColumnsService} from '../wp-fast-table/state/wp-table-columns.service';
import {WorkPackageTableRefreshService} from '../wp-table/wp-table-refresh-request.service';
import {WorkPackageEditContext} from './work-package-edit-context';
import {WorkPackageEditFieldHandler} from './work-package-edit-field-handler';
import {WorkPackageEditForm} from './work-package-edit-form';
import {FocusHelperService} from 'core-app/modules/common/focus/focus-helper';
import {WorkPackageTable} from 'core-components/wp-fast-table/wp-fast-table';
import {
  WorkPackageEditingPortalService
} from "core-components/wp-edit/editing-portal/wp-editing-portal-service";
import {EditField} from "core-app/modules/fields/edit/edit.field.module";

export class TableRowEditContext implements WorkPackageEditContext {

  // Injections
  public templateRenderer:SimpleTemplateRenderer = this.injector.get(SimpleTemplateRenderer);
  public wpTableRefresh:WorkPackageTableRefreshService = this.injector.get(WorkPackageTableRefreshService);
  public wpTableColumns:WorkPackageTableColumnsService = this.injector.get(WorkPackageTableColumnsService);
  public states:States = this.injector.get(States);
  public FocusHelper:FocusHelperService = this.injector.get(FocusHelperService);
  public $q:ng.IQService = this.injector.get($qToken);
  public $timeout:ng.ITimeoutService = this.injector.get($timeoutToken);
  public wpEditingPortalService:WorkPackageEditingPortalService = this.injector.get(WorkPackageEditingPortalService);

  // other fields
  public successState:string;

  // Use cell builder to reset edit fields
  private cellBuilder = new CellBuilder(this.injector);

  constructor(readonly table:WorkPackageTable,
              readonly injector:Injector,
              public workPackageId:string,
              public classIdentifier:string) {
    // injectorBridge(this);
  }

  public findContainer(fieldName:string):JQuery {
    return this.rowContainer.find(`.${tdClassName}.${fieldName} .${editCellContainer}`).first();
  }

  public findCell(fieldName:string) {
    return this.rowContainer.find(`.${tdClassName}.${fieldName}`).first();
  }

  public activateField(form:WorkPackageEditForm, field:EditField, fieldName:string, errors:string[]):Promise<WorkPackageEditFieldHandler> {
    return new Promise<WorkPackageEditFieldHandler>((resolve, reject) => {
      this.waitForContainer(fieldName)
        .then((cell) => {

          // Forcibly set the width since the edit field may otherwise
          // be given more width
          const td = this.findCell(fieldName);
          const width = td.css('width');
          td.css('max-width', width);
          td.css('width', width);

          const handler = this.wpEditingPortalService.create(
            cell,
            form,
            field,
            fieldName,
            errors
          );

          setTimeout(() => {
            handler.focus();
            resolve(handler);
          });
        }).catch(reject);
    });
  }

  public refreshField(field:EditField, handler:WorkPackageEditFieldHandler) {
    handler.$scope.$evalAsync(() => handler.field = field);
  }

  public reset(workPackage:WorkPackageResource, fieldName:string, focus?:boolean) {
    const cell = this.findContainer(fieldName);

    if (cell.length) {
      this.findCell(fieldName).css('width', '');
      this.findCell(fieldName).css('max-width', '');
      this.cellBuilder.refresh(cell[0], workPackage, fieldName);

      if (focus) {
        this.FocusHelper.focusElement(cell);
      }
    }
  }

  public requireVisible(fieldName:string):Promise<any> {
    this.wpTableColumns.addColumn(fieldName);
    return this.waitForContainer(fieldName);
  }

  public firstField(names:string[]) {
    return 'subject';
  }

  public onSaved(isInitial:boolean, savedWorkPackage:WorkPackageResource) {
    // Nothing to do here.
  }

  // Ensure the given field is visible.
  // We may want to look into MutationObserver if we need this in several places.
  private waitForContainer(fieldName:string):Promise<JQuery> {
    return new Promise<JQuery>((resolve, reject) => {
      const interval = setInterval(() => {
        const container = this.findContainer(fieldName);

        if (container.length > 0) {
          clearInterval(interval);
          resolve(container);
        }
      }, 100);
    });
  }

  private get rowContainer() {
    return jQuery(this.table.container).find(`.${this.classIdentifier}-table`);
  }
}
