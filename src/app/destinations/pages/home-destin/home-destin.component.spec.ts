import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeDestinComponent } from './home-destin.component';
import { DestinationService } from '../../services/destinations.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { Destin } from '../../interfaces/destin.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CardComponent } from '../../components/card/card.component';
import { MatCardModule } from '@angular/material/card';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Mock values
const MOCK_DESTINATIONS: Destin[] = [
  {
    name: 'Destination 1',
    capital: 'Capital 1',
    country_code: 'Code 1',
    id: '1',
    description: '',
    src_img: '',
  },
  {
    name: 'Destination 2',
    capital: 'Capital 2',
    country_code: 'Code 2',
    id: '2',
    description: '',
    src_img: '',
  },
  {
    name: 'Destination 3',
    capital: 'Capital 3',
    country_code: 'Code 3',
    id: '3',
    description: '',
    src_img: '',
  },
];

describe('HomeDestinComponent', () => {
  let component: HomeDestinComponent;
  let fixture: ComponentFixture<HomeDestinComponent>;
  let mockDestinationService: jasmine.SpyObj<DestinationService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockDestinationService = jasmine.createSpyObj<DestinationService>([
      'getDestinations',
      'resetDestinationsOriginal',
    ]);
    mockRouter = jasmine.createSpyObj<Router>(['navigate']);
    mockDialog = jasmine.createSpyObj<MatDialog>(['open']);

    await TestBed.configureTestingModule({
      declarations: [HomeDestinComponent, CardComponent, TruncatePipe],
      providers: [
        { provide: DestinationService, useValue: mockDestinationService },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockDialog },
      ],
      imports: [
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatCardModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeDestinComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on init', () => {
    beforeEach(() => {
      mockDestinationService.getDestinations.and.returnValue(
        of(MOCK_DESTINATIONS)
      );
      fixture.detectChanges(); // calls ngOnInit
    });

    it('should set destinations', (done) => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(component.destinations).toEqual(MOCK_DESTINATIONS);
        expect(component.pageDestinations).toEqual(MOCK_DESTINATIONS.slice(0, 6));
        done();
      });
    });
  });

  describe('navigation', () => {
    it('should navigate to new destination', () => {
      component.goNewDestination();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['home/new']);
    });
  });

  describe('resetting destinations', () => {
    it('should reset destinations', () => {
      const dialogRefMock = {
        afterClosed: () => of(true),
        close: (dialogResult: any) => {},
      } as any;

      mockDialog.open.and.returnValue(dialogRefMock);
      component.reset();
      expect(mockDestinationService.resetDestinationsOriginal).toHaveBeenCalled();
    });
  });
});
