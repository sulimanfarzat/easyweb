import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  trustedOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 700,
    dots: true,
    items: 4,
    margin: 30,
    autoplay: true,
    smartSpeed: 700,
    autoplayTimeout: 4000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
        margin: 0
      },
      460: {
        items: 2,
        margin: 0
      },
      576: {
        items: 3,
        margin: 20
      },
      992: {
        items: 4,
        margin: 30
      }
    },
    nav: false
  };

  constructor(private titleService: Title) {
   }

  ngOnInit(): void {
    this.titleService.setTitle('easy2edi | Home');
  }


}
