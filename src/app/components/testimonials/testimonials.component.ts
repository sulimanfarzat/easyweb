import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  currentRate = 5;
  link: any = null;

  testimonialsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 700,
    dots: true,
    items: 1,
    margin: 30,
    autoplay: true,
    smartSpeed: 700,
    autoplayTimeout: 6000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
        margin: 0
      },
      460: {
        items: 1,
        margin: 0
      },
      576: {
        items: 1,
        margin: 20
      },
      992: {
        items: 1,
        margin: 30
      }
    },
    nav: false
  };

  constructor(private route: ActivatedRoute) {
    this.link = this.route.snapshot.url;
   }

  ngOnInit(): void {
  }



}
