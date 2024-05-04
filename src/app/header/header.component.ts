import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchForm :FormGroup
  constructor(
    private router : Router,
    private fromBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  Search() : void{
    this.router.navigate(['/store'], {queryParams : {term:this.searchForm.value.keywords}});
  }
  createForm() : void{
    this.searchForm = this.fromBuilder.group({
      keywords : ['']
    })
  }
  

}
