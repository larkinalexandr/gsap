import { initModals } from './modules/modals/init-modals'
import { mobileVhFix } from './utils/mobile-vh-fix'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

mobileVhFix()
document.addEventListener(
  'DOMContentLoaded',
  () => {
    initModals()
    console.clear()

    const timeline = gsap.timeline({paused: false});
    const titleChars = document.querySelectorAll('[data-sticky-title] span');
    const charRect = titleChars[0].getBoundingClientRect();

    timeline.to(titleChars, {
      y: -window.innerHeight / 2 - charRect.height,
      ease: 'back.in(3)',
      stagger: {
        each: 0.1
      }
    });

    ScrollTrigger.create({
      trigger: "[data-box-container]",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
      animation: timeline,
      markers: true,
      onUpdate: (self) => {
        document.querySelector('.progress').textContent = self.progress
        if (self.progress.toFixed(2) == 0.30) {
          stopScroll()
        }
        // stopScroll()
      }
    });


    function stopScroll() {
      const scroll = window.pageYOffset;

      window.scrollTo(0,scroll)
    }

  },
  true
)
