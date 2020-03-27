import { TestBed } from '@angular/core/testing';
import { DfeedService } from './dfeed.service';
describe('DfeedService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DfeedService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=dfeed.service.spec.js.map