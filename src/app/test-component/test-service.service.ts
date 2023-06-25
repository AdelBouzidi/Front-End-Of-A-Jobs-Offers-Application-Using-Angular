import { Injectable } from '@angular/core';
import { Job } from './test-model';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  constructor() { }
  private jobs: Job[] = [
    {
      name: 'Job 1',
      description: 'Description of Job 1',
      level: 'Level 1',
      expirationDate: '2023-06-30',
      mode: 'Mode 1',
      domain: 'Domain 1'
    },
    {
      name: 'Job 2',
      description: 'Description of Job 2',
      level: 'Level 2',
      expirationDate: '2023-07-15',
      mode: 'Mode 2',
      domain: 'Domain 2'
    }
  ];
  getJobs(): Job[] {
    return this.jobs;
  }
}
