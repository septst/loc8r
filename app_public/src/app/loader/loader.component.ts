import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CounterService } from '../counter.service';
import { LoaderState } from '../loader-state';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() showLoader: boolean = false;

  constructor(
    private counterService: CounterService) { }

  ngOnInit(): void {
  }

  public counter(i: number): Array<number> {
    return this.counterService.counter(i);
  }

}
