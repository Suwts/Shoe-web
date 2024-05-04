import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor() {
    
  }

  public slideIndex = 0;

  ShowSlider(){
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for(i=0; i<slides.length; i++){
      (<HTMLElement>slides[i]).style.display = "none";
    }
    this.slideIndex++;
    if(this.slideIndex > slides.length){
      this.slideIndex = 1;
    }
    (<HTMLElement>slides[this.slideIndex - 1]).style.display = "block";
    setTimeout(() => this.ShowSlider(), 5000)
  }

  ngOnInit(): void {
    this.ShowSlider();

// (() => {
//   "use strict";

//   /**
//    * Easy selector helper function
//    */
//   const select = (el: string, all: boolean = false): HTMLElement | HTMLElement[] => {
//     el = el.trim();
//     if (all) {
//       return Array.from(document.querySelectorAll(el));
//     } else {
//       return document.querySelector(el) as HTMLElement;
//     }
//   };

//   /**
//    * Easy event listener function
//    */
//   const on = (type: string, el: string, listener: EventListenerOrEventListenerObject, all: boolean = false): void => {
//     let selectEl = select(el, all);
//     if (selectEl) {
//       if (all) {
//         (selectEl as HTMLElement[]).forEach((e) => e.addEventListener(type, listener));
//       } else {
//         (selectEl as HTMLElement).addEventListener(type, listener);
//       }
//     }
//   };

//   /**
//    * Easy on scroll event listener
//    */
//   const onscroll = (el: HTMLElement, listener: EventListenerOrEventListenerObject): void => {
//     el.addEventListener("scroll", listener);
//   };

//   /**
//    * Navbar links active state on scroll
//    */
//   // let navbarlinks = select("#navbar .scrollto", true) as HTMLAnchorElement[];
//   // const navbarlinksActive = (): void => {
//   //   let position = window.scrollY + 200;
//   //   navbarlinks.forEach((navbarlink) => {
//   //     if (!navbarlink.hash) return;
//   //     let section = select(navbarlink.hash);
//   //     if (!section) return;
//   //     if (position >= (section as HTMLElement).offsetTop && position <= (section as HTMLElement).offsetTop + (section as HTMLElement).offsetHeight) {
//   //       navbarlink.classList.add("active");
//   //     } else {
//   //       navbarlink.classList.remove("active");
//   //     }
//   //   });
//   // };
//   // window.addEventListener("load", navbarlinksActive);
//   // onscroll(document, navbarlinksActive);

//   // /**
//   //  * Scrolls to an element with header offset
//   //  */
//   // const scrollto = (el: string): void => {
//   //   let header = select("#header");
//   //   let offset = (header as HTMLElement).offsetHeight;

//   //   let elementPos = (select(el) as HTMLElement).offsetTop;
//   //   window.scrollTo({
//   //     top: elementPos - offset,
//   //     behavior: "smooth",
//   //   });
//   // };

//   // /**
//   //  * Toggle .header-scrolled class to #header when page is scrolled
//   //  */
//   // let selectHeader = select("#header");
//   // let selectTopbar = select("#topbar");
//   // if (selectHeader) {
//   //   const headerScrolled = (): void => {
//   //     if (window.scrollY > 100) {
//   //       (selectHeader as HTMLElement).classList.add("header-scrolled");
//   //       if (selectTopbar) {
//   //         (selectTopbar as HTMLElement).classList.add("topbar-scrolled");
//   //       }
//   //     } else {
//   //       (selectHeader as HTMLElement).classList.remove("header-scrolled");
//   //       if (selectTopbar) {
//   //         (selectTopbar as HTMLElement).classList.remove("topbar-scrolled");
//   //       }
//   //     }
//   //   };
//   //   window.addEventListener("load", headerScrolled);
//   //   onscroll(document, headerScrolled);
//   // }

//   // /**
//   //  * Back to top button
//   //  */
//   // let backtotop = select(".back-to-top");
//   // if (backtotop) {
//   //   const toggleBacktotop = (): void => {
//   //     if (window.scrollY > 100) {
//   //       (backtotop as HTMLElement).classList.add("active");
//   //     } else {
//   //       (backtotop as HTMLElement).classList.remove("active");
//   //     }
//   //   };
//   //   window.addEventListener("load", toggleBacktotop);
//   //   onscroll(document, toggleBacktotop);
//   // }

//   /**
//    * Mobile nav toggle
//    */
//   on("click", ".mobile-nav-toggle", function (e) {
//     const element = select("#navbar") as HTMLElement; // Khẳng định là HTMLElement
//     element.classList.toggle("navbar-mobile");
//     this.classList.toggle("bi-list");
//     this.classList.toggle("bi-x");
//   });

//   /**
//    * Mobile nav dropdowns activate
//    */
//   on(
//     "click",
//     ".navbar .dropdown > a",
//     function (e) {
//       const navbar = select("#navbar");
//       if (navbar instanceof HTMLElement && navbar.classList.contains("navbar-mobile")) {
//         e.preventDefault();
//         this.nextElementSibling.classList.toggle("dropdown-active");
//       } else {
//         // Xử lý trường hợp ngoại lệ (nhiều menu dropdown)
//         console.error("Unexpected number of navbar elements found");
//       }
//     },
//     true
//   );
  

//   /**
//    * Scrool with ofset on links with a class name .scrollto
//    */
//   on(
//     "click",
//     ".scrollto",
//     function (e) {
//       if (select(this.hash)) {
//         e.preventDefault();

//         let navbar = select("#navbar");
//         if (navbar instanceof HTMLElement && navbar.classList.contains("navbar-mobile")) {
//           navbar.classList.remove("navbar-mobile");
//           let navbarToggle = select(".mobile-nav-toggle");
//           if(navbarToggle instanceof HTMLElement){
//             navbarToggle.classList.toggle("bi-list");
//             navbarToggle.classList.toggle("bi-x");
//           }
          
//         }
//         scrollTo(this.hash);
//       }
//     },
//     true
//   );

//   /**
//    * Scroll with ofset on page load with hash links in the url
//    */
//   // window.addEventListener("load", () => {
//   //   if (window.location.hash) {
//   //     if (select(window.location.hash)) {
//   //       scrollTo(window.location.hash);
//   //     }
//   //   }
//   // });
  

//   /**
//    * Hero carousel indicators
//    */
//   let heroCarouselIndicators = select("#hero-carousel-indicators") as HTMLElement;
//   let heroCarouselItems = select("#heroCarousel .carousel-item", true) as HTMLElement[];

//   heroCarouselItems.forEach((item, index) => {
//     index === 0
//       ? (heroCarouselIndicators.innerHTML += `<li data-bs-target='#heroCarousel' data-bs-slide-to='${index}' class='active'></li>`)
//       : (heroCarouselIndicators.innerHTML += `<li data-bs-target='#heroCarousel' data-bs-slide-to='${index}'></li>`);
//   });

//   /*------------------
//         Product Slider
//     --------------------*/
//   $(".product-slider").owlCarousel({
//     loop: true,
//     margin: 25,
//     nav: true,
//     items: 4,
//     dots: true,
//     navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
//     smartSpeed: 1200,
//     autoHeight: false,
//     autoplay: true,
//     responsive: {
//       0: {
//         items: 1,
//       },
//       576: {
//         items: 2,
//       },
//       992: {
//         items: 2,
//       },
//       1200: {
//         items: 3,
//       },
//     },
//   });

//   const glightbox = GLightbox({
//     selector: ".glightbox",
//   });

//   new Swiper(".slides-1", {
//     speed: 600,
//     loop: true,
//     autoplay: {
//       delay: 5000,
//       disableOnInteraction: false,
//     },
//     slidesPerView: "auto",
//     pagination: {
//       el: ".swiper-pagination",
//       type: "bullets",
//       clickable: true,
//     },
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//   });
//   /**
//    * Animation on scroll
//    */
//   // window.addEventListener('load', () => {
//   //   AOS.init({
//   //     duration: 1000,
//   //     easing: "ease-in-out",
//   //     once: true,
//   //     mirror: false
//   //   });
//   // });

//   /**
//    * Initiate Pure Counter
//    */
//   // new PureCounter();
// })();

  }
  

}
