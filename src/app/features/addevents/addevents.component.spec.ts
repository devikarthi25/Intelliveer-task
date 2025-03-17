import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeventsComponent } from './addevents.component';

describe('AddeventsComponent', () => {
  let component: AddeventsComponent;
  let fixture: ComponentFixture<AddeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddeventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
