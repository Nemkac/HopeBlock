import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCampaignDialogComponent } from './create-campaign-dialog.component';

describe('CreateCampaignDialogComponent', () => {
  let component: CreateCampaignDialogComponent;
  let fixture: ComponentFixture<CreateCampaignDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCampaignDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCampaignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
