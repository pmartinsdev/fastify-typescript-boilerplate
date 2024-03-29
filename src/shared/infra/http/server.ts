import "dotenv/config";
import "reflect-metadata";

import AutoLoad from "@fastify/autoload";
import fastify, { FastifyInstance } from "fastify";
import { join } from "path";

import { Singleton } from "@shared/decorators/singleton";
import { registerRoutes } from "@shared/infra/http/routes/root";

@Singleton
export class ApiServer {
  api: FastifyInstance;

  constructor() {
    this.api = fastify({
      logger: true,
      trustProxy: true,
    });

    this.usePlugins();
    this.useRoutes();
  }

  private usePlugins() {
    void this.api.register(import("@fastify/cors"));

    void this.api.register(AutoLoad, {
      dir: join(__dirname, "..", "plugins"),
    });
  }

  private useRoutes(): void {
    registerRoutes(this.api);
  }
}
