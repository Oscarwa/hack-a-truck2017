import { Component, OnInit } from '@angular/core';
import { TrailerService } from '../trailer.service';
import { Trailer } from '../trailer';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {
  trailers: any[];
  q: any;

  constructor(
    private trailerService: TrailerService,
    private router: Router
  ) { }

  ngOnInit() {
    let $trailers = this.trailerService.getAllPlus();
    $trailers.subscribe(res => {
      this.trailers = res;
    });
  }

  formatter = (result: Trailer) => result.container.toUpperCase();

  inputFormatter = (x: {container: string}) => x.container.toUpperCase();

  submit = () => {
    this.router.navigate(['/trailers/' + this.q.$key]);
  }

  search = (text$: Observable<string>) => 
    text$
      .debounceTime(100)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.deepSearch(term.toLowerCase()));

  deepSearch(term: string) {
    let byOperator = this.trailers.filter(v => (v.operatorIn || '').toLowerCase().indexOf(term) > -1).slice(0, 10);
    let byKey = this.trailers.filter(v => (v.$key || '').toLowerCase().indexOf(term) > -1).slice(0, 10);
    let byTrailer = this.trailers.filter(v => (v.trailer || '').toLowerCase().indexOf(term) > -1).slice(0, 10);
    let byTractor = this.trailers.filter(v => (v.tractor || '').toLowerCase().indexOf(term) > -1).slice(0, 10);
    let byContainer = this.trailers.filter(v => (v.container || '').toLowerCase().indexOf(term) > -1).slice(0, 10);
    return byOperator.concat(byKey, byTrailer, byTractor, byContainer);
  }
}
