import { Component, OnInit } from '@angular/core';
import { ParkService } from '../park.service';
import { Park } from '../park';
import { NgClass } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-parking-lot',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.css']
})
export class ParkingLotComponent implements OnInit {

  constructor(private parkService: ParkService, private modalService: NgbModal) { }

  parksA1: Park[];
  parksA2: Park[];
  parksB1: Park[];
  parksB2: Park[];

  ngOnInit() {
    let $parks = this.parkService.getAll();
    $parks.subscribe(res => {
      this.parksA1 = res.filter((item, index) => item.area == 'A' && item.number <= 50);
      this.parksA2 = res.filter((item, index) => item.area == 'A' && item.number > 50);
      this.parksB1 = res.filter((item, index) => item.area == 'B' && item.number <= 50);
      this.parksB2 = res.filter((item, index) => item.area == 'B' && item.number > 50);      
    });
  }

}
