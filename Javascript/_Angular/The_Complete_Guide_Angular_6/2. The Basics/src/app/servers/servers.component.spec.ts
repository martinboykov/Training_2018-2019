import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServersCliComponent } from './servers.component';

describe('ServersCliComponent', () => {
  let component: ServersCliComponent;
  let fixture: ComponentFixture<ServersCliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServersCliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServersCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
