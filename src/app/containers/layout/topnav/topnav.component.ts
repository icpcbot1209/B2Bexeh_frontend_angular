import { Component, OnInit, OnDestroy, HostListener, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService, ISidebar } from '../sidebar/sidebar.service';
import { Router } from '@angular/router';
import { LangService, Language } from 'src/app/shared/lang.service';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';
import { getThemeColor, setThemeColor } from 'src/app/utils/util';

import { Colors } from 'src/app/constants/colors.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent implements OnInit, OnDestroy {
  @Input() isAdminSite: boolean = false;

  adminRoot = environment.adminRoot;
  sidebar: ISidebar;
  subscription: Subscription;

  isFullScreen = false;

  themeColor1 = Colors.getColors().themeColor1;
  foregroundColor = Colors.getColors().foregroundColor;

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService,
    public userService: UserService,
    private router: Router,
    private langService: LangService
  ) {}

  fullScreenClick(): void {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  @HostListener('document:fullscreenchange', ['$event'])
  handleFullscreen(event): void {
    if (document.fullscreenElement) {
      this.isFullScreen = true;
    } else {
      this.isFullScreen = false;
    }
  }

  async ngOnInit(): Promise<void> {
    this.subscription = this.sidebarService.getSidebar().subscribe(
      (res) => {
        this.sidebar = res;
      },
      (err) => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  menuButtonClick = (e: { stopPropagation: () => void }, menuClickCount: number, containerClassnames: string) => {
    if (e) {
      e.stopPropagation();
    }

    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);

    this.sidebarService.setContainerClassnames(++menuClickCount, containerClassnames, this.sidebar.selectedMenuHasSubItems);
  };

  mobileMenuButtonClick = (event: { stopPropagation: () => void }, containerClassnames: string) => {
    if (event) {
      event.stopPropagation();
    }
    this.sidebarService.clickOnMobileMenu(containerClassnames);
  };

  onSignOut(): void {
    this.authService.signOut();
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event): void {
    const input = document.querySelector('.mobile-view');
    if (input && input.classList) {
      input.classList.remove('mobile-view');
    }
  }
}
