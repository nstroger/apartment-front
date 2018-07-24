import { ApartmentsModule } from './apartments.module';

describe('ApartmentsModule', () => {
  let apartmentsModule: ApartmentsModule;

  beforeEach(() => {
    apartmentsModule = new ApartmentsModule();
  });

  it('should create an instance', () => {
    expect(apartmentsModule).toBeTruthy();
  });
});
