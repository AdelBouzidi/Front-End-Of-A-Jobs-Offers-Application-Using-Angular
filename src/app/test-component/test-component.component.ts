import { Component, OnInit } from '@angular/core';
import { Job } from './test-model';
import { TestServiceService } from './test-service.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import 'jquery';



@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit{
  selectedFile: File | undefined;

  ngOnInit(): void {
    
  }
  







   
}
