// -- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2018 the OpenProject Foundation (OPF)
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
// ++    Ng1FieldControlsWrapper,



import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AuthoringComponent} from 'core-app/modules/common/authoring/authoring.component';
import {AutocompleteSelectDecorationComponent} from 'core-app/modules/common/autocomplete-select-decoration/autocomplete-select-decoration.component';
import {ConfigurationService} from 'core-app/modules/common/config/configuration.service';
import {OpDateTimeComponent} from 'core-app/modules/common/date/op-date-time.component';
import {WorkPackageEditActionsBarComponent} from 'core-app/modules/common/edit-actions-bar/wp-edit-actions-bar.component';
import {GonRef} from 'core-app/modules/common/gon-ref/gon-ref';
import {AttributeHelpTextComponent} from 'core-app/modules/common/help-texts/attribute-help-text.component';
import {AttributeHelpTextModal} from 'core-app/modules/common/help-texts/attribute-help-text.modal';
import {AttributeHelpTextsService} from 'core-app/modules/common/help-texts/attribute-help-text.service';
import {AddSectionDropdownComponent} from 'core-app/modules/common/hide-section/add-section-dropdown/add-section-dropdown.component';
import {HideSectionLinkComponent} from 'core-app/modules/common/hide-section/hide-section-link/hide-section-link.component';
import {HideSectionComponent} from 'core-app/modules/common/hide-section/hide-section.component';
import {HideSectionService} from 'core-app/modules/common/hide-section/hide-section.service';
import {OpIcon} from 'core-app/modules/common/icon/op-icon';
import {LoadingIndicatorService} from 'core-app/modules/common/loading-indicator/loading-indicator.service';
import {AuthorisationService} from 'core-app/modules/common/model-auth/model-auth.service';
import {NotificationComponent} from 'core-app/modules/common/notifications/notification.component';
import {NotificationsContainerComponent} from 'core-app/modules/common/notifications/notifications-container.component';
import {NotificationsService} from 'core-app/modules/common/notifications/notifications.service';
import {UploadProgressComponent} from 'core-app/modules/common/notifications/upload-progress.component';
import {PathHelperService} from 'core-app/modules/common/path-helper/path-helper.service';
import ExpressionService from 'core-app/modules/common/xss/expression.service';
import {OpDatePickerComponent} from "core-app/modules/common/op-date-picker/op-date-picker.component";
import {FocusWithinDirective} from "core-app/modules/common/focus/focus-within.upgraded.directive";
import {upgradeService} from "core-app/angular4-transition-utils";
import {FocusHelperService} from "core-app/modules/common/focus/focus-helper";
import {AccessibleClickDirective} from "core-app/modules/a11y/accessible-click.directive";
import {AccessibleByKeyboardComponent} from "core-app/modules/a11y/accessible-by-keyboard.component";

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
  ],
  exports: [
    AccessibleClickDirective,
    AccessibleByKeyboardComponent,
  ],
  declarations: [
    AccessibleClickDirective,
    AccessibleByKeyboardComponent,
  ]
})
export class OpenprojectAccessibilityModule { }


