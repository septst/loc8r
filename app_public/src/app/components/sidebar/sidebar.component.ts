import { Component, OnInit, Input } from '@angular/core';
import { AddLineBreaksPipe } from '../../pipes/add-line-breaks.pipe';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() content: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
