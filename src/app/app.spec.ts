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
    expect(compiled.textContent).toContain('Antalya');
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
    expect(compiled.textContent).toContain('Hurghada');
  });

  it('should render Sava Tours partner iframes and route Summer to Antalya first', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const iframes = Array.from(compiled.querySelectorAll('iframe'));
    const summerLink = Array.from(compiled.querySelectorAll('.primary-nav a')).find((link) =>
      link.textContent?.includes('Лето'),
    ) as HTMLAnchorElement;

    expect(iframes.length).toBe(4);
    expect(iframes[0].title).toBe('Antalya');
    expect(summerLink.getAttribute('href')).toBe('#partners');
    expect(compiled.textContent).toContain('Sava Tours B2C понуди');
  });
});
