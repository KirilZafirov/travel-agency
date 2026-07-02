import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render Macedonian by default', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('ВЕЛ-ЈАН од Кочани');
    expect(compiled.textContent).toContain('Контактирај агенција');
    expect(compiled.textContent).toContain('Сончев Брег');
    expect(compiled.textContent).toContain('Facebook страница');
  });

  it('should switch to English when requested by the user', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const englishButton = Array.from(compiled.querySelectorAll('button')).find(
      (button) => button.textContent?.trim() === 'EN',
    ) as HTMLButtonElement;

    englishButton.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(compiled.querySelector('h1')?.textContent).toContain('VEL-JAN from Kocani');
    expect(compiled.textContent).toContain('Contact agency');
  });

  it('should render partner iframe fallbacks for missing and blocked URLs', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('iframe').length).toBe(2);
    expect(compiled.textContent).toContain('Партнерската понуда сè уште не е поврзана.');
    expect(compiled.textContent).toContain('Овој партнерски извор моментално не може безбедно да се прикаже тука.');
  });
});
