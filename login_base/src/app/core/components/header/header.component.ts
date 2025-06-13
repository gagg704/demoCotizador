import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../features/auth/auth.service';
import { StorageService } from '../../services/storage.service';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { ModuleService } from '../../services/module.services';
import { MatDivider } from '@angular/material/divider';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { PasswordResetFormComponent } from '../password-reset-form/password-reset-form.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatMenuModule,
        MatSidenavModule,
        FlexLayoutModule,
        MatCardModule,
        MatDivider,
    ]
})
export class HeaderComponent {

  authService = inject(AuthService);
  storageService = inject(StorageService);
  moduleService = inject(ModuleService);
  dialog = inject( MatDialog );
  

  user = this.storageService.getUser();
  menues: any[] = [];

  button = { action: "logout"}
  isLoggedIn = false;
  cashoutOpen: boolean = false;
  role = null;
  version = environment.version;
  
  ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.getModules();
  }

  getModules(){
    this.moduleService.getModulesbyRole( this.user.roleId)
    .subscribe({
      next: response => {
        this.menues = this.groupMenuItems( response.data ) ;
      },
      error: err => {

      }
    });
  }

  executeAction( action: string){
    const a = 'logout';
    this[a]();
  }

  groupMenuItems(items: any[]): any[] {
    const groupedData: any[] = [];
    const menuMap = new Map<string, any>(); // Map to store menus with "index" as key
    let itemIndex:any = null;

    items.forEach( item =>{
      if (item.level === 'menu') {
        itemIndex = item.index;
        menuMap.set(item.index, {
          id: item.id,
          module: item.module,
          route: item.route,
          icon: item.icon,
          level: item.level,
          active: item.active,
          submenus: [],
        });
      } else {
        if (item.level === 'submenu') {
          const existingMenu = menuMap.get(itemIndex);
          if (existingMenu) {
            existingMenu.submenus.push(item);
          }
        }
      }
    });


    //Convert Map values to array, but handle duplicate "index" values
    for (const [index, menu] of menuMap.entries()) {
      const existingMenuIndex = groupedData.findIndex(
        (existingMenu) => existingMenu.index === index
      );
  
      if (existingMenuIndex !== -1) {
        // If a menu with the same "index" exists, add submenu to its submenus
        groupedData[existingMenuIndex].submenus.push(menu);
      } else {
        // If it's a new menu, push it to groupedData
        groupedData.push(menu);
      }
    }
  
    return groupedData;
  }


  resetPassword(){
    const dialogRef = this.dialog.open(PasswordResetFormComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    })    
  }

  logout(){
    this.authService.logOut();
  }

}
