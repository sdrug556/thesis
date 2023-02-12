import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { DxTreeViewComponent } from 'devextreme-angular';
import { ContentReadyEvent, ItemClickEvent } from 'devextreme/ui/list';
import { filter } from 'rxjs';
import { ComponentBase } from 'src/app/components/component-base';
import { routeAnimations } from './admin.animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [routeAnimations],
})
export class AdminComponent
  extends ComponentBase
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(DxTreeViewComponent) dxTreeview?: DxTreeViewComponent;

  name?: any = null;
  image?: any = null;

  menuItems = [
    {
      title: 'Dashboard',
      url: 'dashboard',
      icon: 'mdi mdi-view-dashboard',
    },
    {
      title: 'Products',
      url: 'products',
      icon: 'mdi mdi-package-variant',
    },
    {
      title: 'Categories',
      url: 'categories',
      icon: 'mdi mdi-shape',
    },
    {
      title: 'Supplier',
      url: 'supplier',
      icon: 'mdi mdi-truck',
    },
    {
      title: 'Stock Adjustment',
      url: 'stock-adjustment',
      icon: 'mdi mdi-plus-minus',
    },
    {
      title: 'User',
      url: 'users',
      icon: 'mdi mdi-account-group',
      menu: [
        {
          title: 'User Manager',
          url: 'users/manager',
          icon: 'mdi mdi-account-group'
        },
        {
          title: 'Login History',
          url: 'users/login-history',
          icon: 'mdi mdi-history'
        }
      ]
    },
    {
      title: 'Reports',
      icon: 'mdi mdi-chart-line',
      menu: [
        {
          title: 'Sales Report',
          url: 'reports/sales',
          icon: 'mdi mdi-chart-bar',
        },
        {
          title: 'Products Report',
          url: 'reports/products',
          icon: 'mdi mdi-package-variant'
        }
      ],
    },
    // {
    //   title: 'Profile',
    //   url: 'profile',
    //   icon: 'mdi mdi-account',
    // },
  ];

  onItemClick(e: ItemClickEvent): void {
    if (e.itemData.menu?.length || !e.itemData.url) {
      return;
    }
    this._router.navigate([e.itemData.url], {
      relativeTo: this._ar,
    });
  }

  onContentReady(e: ContentReadyEvent): void {}

  ngOnInit(): void {
    super.subscribe(
      this._router.events.pipe(filter((a) => a instanceof NavigationEnd)),
      (_) => {
        // this.dxTreeview.instance?.collapseAll();
        this._highlightActiveMenuItem();
      }
    );

    const userInfo = this._authService.userInfo;
    this.name = `${userInfo?.lastName} ${userInfo?.firstName}`;
    this.image = null;
  }

  ngAfterViewInit(): void {
    setTimeout(() => this._highlightActiveMenuItem());
  }

  ngOnDestroy(): void {
    super.dispose();
  }

  private _highlightActiveMenuItem(): void {
    const activeItem = this._getCurrentRouteUrl();
    this.dxTreeview?.instance.selectItem(activeItem);
    this.dxTreeview?.instance.expandItem(activeItem);
  }

  private _getCurrentRouteUrl(): any {
    const findActiveRoute = (menu: any[]) => {
      let activeItem: any = null;
      for (let i = 0, len = menu.length; i < len; i++) {
        if (activeItem) {
          break;
        }
        const item = menu[i];
        if (this._router.url === `/admin/${item.url}`) {
        // if (this._router.url?.endsWith(item.url)) {
          activeItem = item;
        } else if (item.menu) {
          activeItem = findActiveRoute(item.menu);
        }
      }
      return activeItem;
    };
    return findActiveRoute(this.menuItems);
  }

  prepareRoute(): boolean {
    return false;
  }

  constructor(private _router: Router, private _ar: ActivatedRoute, private _authService: AuthService) {
    super();
  }
}
