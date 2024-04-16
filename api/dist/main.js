"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    console.log(process.env.RMQ_URL);
    console.log(process.env.RMQ_AUTH_QUEUE);
    console.log(process.env.RMQ_DATABASE_QUEUE);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map