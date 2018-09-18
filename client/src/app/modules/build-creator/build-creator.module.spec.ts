import { BuildCreatorModule } from './build-creator.module';

describe('BuildsModule', () => {
  let buildsModule: BuildCreatorModule;

  beforeEach(() => {
    buildsModule = new BuildCreatorModule();
  });

  it('should create an instance', () => {
    expect(buildsModule).toBeTruthy();
  });
});
