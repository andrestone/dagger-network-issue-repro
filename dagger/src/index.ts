import {
  dag,
  Container,
  Directory,
  object,
  func,
  Service,
} from "@dagger.io/dagger";

@object()
export class PlaywrightDaggerRepro {
  @func()
  container(source: Directory): Container {
    return dag
      .container()
      .from("node:22.17")
      .withDirectory("/work", source, {
        exclude: ["node_modules", "dagger"],
      })
      .withWorkdir("/work")
      .withExec(["npm", "install"])
      .withExec(["npx", "playwright", "install", "--with-deps", "chromium"]);
  }

  @func()
  async test(source: Directory): Promise<string> {
    return await this.container(source).withExec(["npm", "test"]).stdout();
  }

  @func()
  ui(source: Directory): Service {
    return this.container(source)
      .withExposedPort(48002)
      .withEnvVariable("TEST_BROWSER", "chromium")
      .asService({
        args: ["npm", "run", "test:ui"],
      });
  }
}
