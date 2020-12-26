"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.TopnavComponent = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var util_1 = require("src/app/utils/util");
var colors_service_1 = require("src/app/constants/colors.service");
var TopnavComponent = /** @class */ (function () {
    function TopnavComponent(sidebarService, authService, router, langService) {
        var _this = this;
        this.sidebarService = sidebarService;
        this.authService = authService;
        this.router = router;
        this.langService = langService;
        this.buyUrl = environment_1.environment.buyUrl;
        this.adminRoot = environment_1.environment.adminRoot;
        this.displayName = 'Sarah Cortney';
        this.isFullScreen = false;
        this.isDarkModeActive = false;
        this.searchKey = '';
        this.themeColor1 = colors_service_1.Colors.getColors().themeColor1;
        this.foregroundColor = colors_service_1.Colors.getColors().foregroundColor;
        this.menuButtonClick = function (e, menuClickCount, containerClassnames) {
            if (e) {
                e.stopPropagation();
            }
            setTimeout(function () {
                var event = document.createEvent('HTMLEvents');
                event.initEvent('resize', false, false);
                window.dispatchEvent(event);
            }, 350);
            _this.sidebarService.setContainerClassnames(++menuClickCount, containerClassnames, _this.sidebar.selectedMenuHasSubItems);
        };
        this.mobileMenuButtonClick = function (event, containerClassnames) {
            if (event) {
                event.stopPropagation();
            }
            _this.sidebarService.clickOnMobileMenu(containerClassnames);
        };
        this.languages = this.langService.supportedLanguages;
        this.currentLanguage = this.langService.languageShorthand;
        this.isSingleLang = this.langService.isSingleLang;
        this.isDarkModeActive = util_1.getThemeColor().indexOf('dark') > -1 ? true : false;
    }
    TopnavComponent.prototype.onDarkModeChange = function (event) {
        var color = util_1.getThemeColor();
        if (color.indexOf('dark') > -1) {
            color = color.replace('dark', 'light');
        }
        else if (color.indexOf('light') > -1) {
            color = color.replace('light', 'dark');
        }
        util_1.setThemeColor(color);
        setTimeout(function () {
            window.location.reload();
        }, 200);
    };
    TopnavComponent.prototype.fullScreenClick = function () {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        else {
            document.documentElement.requestFullscreen();
        }
    };
    TopnavComponent.prototype.handleFullscreen = function (event) {
        if (document.fullscreenElement) {
            this.isFullScreen = true;
        }
        else {
            this.isFullScreen = false;
        }
    };
    TopnavComponent.prototype.onLanguageChange = function (lang) {
        this.langService.language = lang.code;
        this.currentLanguage = this.langService.languageShorthand;
    };
    TopnavComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.authService.getUser()];
                    case 1:
                        if (!_b.sent()) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, this.authService.getUser().then(function (user) {
                                return user.displayName;
                            })];
                    case 2:
                        _a.displayName = _b.sent();
                        _b.label = 3;
                    case 3:
                        this.subscription = this.sidebarService.getSidebar().subscribe(function (res) {
                            _this.sidebar = res;
                        }, function (err) {
                            console.error("An error occurred: " + err.message);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TopnavComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    TopnavComponent.prototype.onSignOut = function () {
        var _this = this;
        this.authService.signOut().subscribe(function () {
            _this.router.navigate(['/']);
        });
    };
    TopnavComponent.prototype.searchKeyUp = function (event) {
        if (event.key === 'Enter') {
            this.search();
        }
        else if (event.key === 'Escape') {
            var input = document.querySelector('.mobile-view');
            if (input && input.classList) {
                input.classList.remove('mobile-view');
            }
            this.searchKey = '';
        }
    };
    TopnavComponent.prototype.searchAreaClick = function (event) {
        event.stopPropagation();
    };
    TopnavComponent.prototype.searchClick = function (event) {
        if (window.innerWidth < environment_1.environment.menuHiddenBreakpoint) {
            var elem = event.target;
            if (!event.target.classList.contains('search')) {
                if (event.target.parentElement.classList.contains('search')) {
                    elem = event.target.parentElement;
                }
                else if (event.target.parentElement.parentElement.classList.contains('search')) {
                    elem = event.target.parentElement.parentElement;
                }
            }
            if (elem.classList.contains('mobile-view')) {
                this.search();
                elem.classList.remove('mobile-view');
            }
            else {
                elem.classList.add('mobile-view');
            }
        }
        else {
            this.search();
        }
        event.stopPropagation();
    };
    TopnavComponent.prototype.search = function () {
        if (this.searchKey && this.searchKey.length > 1) {
            this.router.navigate([this.adminRoot + '/pages/miscellaneous/search'], {
                queryParams: { key: this.searchKey.toLowerCase().trim() }
            });
            this.searchKey = '';
        }
    };
    TopnavComponent.prototype.handleDocumentClick = function (event) {
        var input = document.querySelector('.mobile-view');
        if (input && input.classList) {
            input.classList.remove('mobile-view');
        }
        this.searchKey = '';
    };
    __decorate([
        core_1.HostListener('document:fullscreenchange', ['$event'])
    ], TopnavComponent.prototype, "handleFullscreen");
    __decorate([
        core_1.HostListener('document:click', ['$event'])
    ], TopnavComponent.prototype, "handleDocumentClick");
    TopnavComponent = __decorate([
        core_1.Component({
            selector: 'app-topnav',
            templateUrl: './topnav.component.html'
        })
    ], TopnavComponent);
    return TopnavComponent;
}());
exports.TopnavComponent = TopnavComponent;
