"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendApplication = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const boot_1 = require("@loopback/boot");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const service_proxy_1 = require("@loopback/service-proxy");
const path_1 = tslib_1.__importDefault(require("path"));
const datasources_1 = require("./datasources");
const repositories_1 = require("./repositories");
const sequence_1 = require("./sequence");
const user_service_1 = require("./services/user.service");
class BackendApplication extends (0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.component(authentication_1.AuthenticationComponent);
        this.component(authentication_jwt_1.JWTAuthenticationComponent);
        this.dataSource(datasources_1.DbDataSource, authentication_jwt_1.UserServiceBindings.DATASOURCE_NAME);
        this.bind(authentication_jwt_1.UserServiceBindings.USER_SERVICE).toClass(user_service_1.CustomUserService);
        this.bind(authentication_jwt_1.UserServiceBindings.USER_REPOSITORY).toClass(repositories_1.UserRepository);
        this.bind(authentication_jwt_1.UserServiceBindings.USER_CREDENTIALS_REPOSITORY).toClass(repositories_1.UserCredentialsRepository);
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
}
exports.BackendApplication = BackendApplication;
//# sourceMappingURL=application.js.map