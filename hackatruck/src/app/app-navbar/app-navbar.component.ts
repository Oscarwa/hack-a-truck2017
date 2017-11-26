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
  trailers: Trailer[];
  q: Trailer;

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
        : this.trailers.filter(v => (v.operator || '').toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

}
