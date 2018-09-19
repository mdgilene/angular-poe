import { ExileBuildsModule } from './exile-builds.module';

describe('BuildsModule', () => {
  let buildsModule: ExileBuildsModule;

  beforeEach(() => {
    buildsModule = new ExileBuildsModule();
  });

  it('should create an instance', () => {
    expect(buildsModule).toBeTruthy();
  });
});
