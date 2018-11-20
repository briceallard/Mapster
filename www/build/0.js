webpackJsonp([0],{

/***/ 521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__(527);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegisterPageModule = /** @class */ (function () {
    function RegisterPageModule() {
    }
    RegisterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]),
            ],
        })
    ], RegisterPageModule);
    return RegisterPageModule;
}());

//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return TOAST_DURATION; });
/* unused harmony export LOADING_STYLE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Pages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LoadingMessages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorMessages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SuccessMessages; });
var TOAST_DURATION = 3000;
var LOADING_STYLE = 'crescent';
var Pages = /** @class */ (function () {
    function Pages() {
    }
    Pages.LOGIN_PAGE = 'LoginPage';
    Pages.REGISTER_PAGE = 'RegisterPage';
    Pages.HOME_PAGE = 'HomePage';
    Pages.PROFILE_PAGE = 'ProfilePage';
    Pages.MODAL_PROFILE = 'ModalProfilePage';
    return Pages;
}());

var LoadingMessages = /** @class */ (function () {
    function LoadingMessages() {
    }
    LoadingMessages.LOGIN = 'Logging in...';
    LoadingMessages.REGISTER = 'Creating account...';
    LoadingMessages.PROFILE = 'Saving profile...';
    return LoadingMessages;
}());

var ErrorMessages = /** @class */ (function () {
    function ErrorMessages() {
    }
    ErrorMessages.EMPTY_FIELDS = 'Empty fields are not allowed.';
    ErrorMessages.PASSWORD_MISMATCH = 'Passwords do not match.';
    return ErrorMessages;
}());

var SuccessMessages = /** @class */ (function () {
    function SuccessMessages() {
    }
    SuccessMessages.REGISTER = 'Account created!';
    SuccessMessages.PROFILE = 'Profile saved!';
    return SuccessMessages;
}());

//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utilities_utilities__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_constants__ = __webpack_require__(523);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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





var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, auth, utilities) {
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.utilities = utilities;
        this.account = {};
        this.account.email = this.account.password = this.password = '';
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loader, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loader = this.utilities.getLoading(__WEBPACK_IMPORTED_MODULE_4__utils_constants__["b" /* LoadingMessages */].LOGIN);
                        if (!this.validate()) return [3 /*break*/, 7];
                        if (!this.validatePassword()) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        loader.present();
                        // create account
                        return [4 /*yield*/, this.auth.createUserWithEmailAndPassword(this.account)];
                    case 2:
                        // create account
                        _a.sent();
                        loader.dismiss();
                        this.utilities.showToast(__WEBPACK_IMPORTED_MODULE_4__utils_constants__["d" /* SuccessMessages */].REGISTER, __WEBPACK_IMPORTED_MODULE_4__utils_constants__["e" /* TOAST_DURATION */]);
                        this.navCtrl.pop();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        loader.dismiss();
                        this.utilities.showToast(e_1, __WEBPACK_IMPORTED_MODULE_4__utils_constants__["e" /* TOAST_DURATION */]);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        this.utilities.showToast(__WEBPACK_IMPORTED_MODULE_4__utils_constants__["a" /* ErrorMessages */].PASSWORD_MISMATCH, __WEBPACK_IMPORTED_MODULE_4__utils_constants__["e" /* TOAST_DURATION */]);
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        this.utilities.showToast(__WEBPACK_IMPORTED_MODULE_4__utils_constants__["a" /* ErrorMessages */].EMPTY_FIELDS, __WEBPACK_IMPORTED_MODULE_4__utils_constants__["e" /* TOAST_DURATION */]);
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    RegisterPage.prototype.validate = function () {
        return this.account.email !== '' && this.account.password !== '' && this.account.password !== '';
    };
    RegisterPage.prototype.validatePassword = function () {
        return this.account.password === this.password;
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/Users/zacharyconley/Documents/Computer_Science/Griffin_2/Mapster/src/pages/register/register.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Registration</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n  <ion-list>\n  \n    <ion-item class="item">\n      <ion-label floating>Email</ion-label>\n      <ion-input type="text" class="email" [(ngModel)]="account.email" ></ion-input>\n    </ion-item>\n  \n    <ion-item class="item">\n      <ion-label floating>Password</ion-label>\n      <ion-input type="password" class="password" [(ngModel)]="account.password"></ion-input>\n    </ion-item>\n  \n    <ion-item class="item">\n      <ion-label floating>Verify Password</ion-label>\n      <ion-input type="password" class="password" [(ngModel)]="password" ></ion-input>\n    </ion-item>\n  \n    <button ion-button round (click)="register()" class="submit">\n      Submit\n    </button>\n  \n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/zacharyconley/Documents/Computer_Science/Griffin_2/Mapster/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_utilities_utilities__["a" /* UtilitiesProvider */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ })

});
//# sourceMappingURL=0.js.map