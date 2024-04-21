import { initModals } from './modules/modals/init-modals'
import { mobileVhFix } from './utils/mobile-vh-fix'
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


mobileVhFix()
document.addEventListener(
  'DOMContentLoaded',
  () => {
    initModals()
    console.clear();



    const textElements = gsap.utils.toArray(".textelements");
    const imgElements = gsap.utils.toArray(".imgelements");

    const toggleRevealText = (index) => {
      const next = textElements[index];
      const prev = textElements[index - 1];
      next && next.classList.toggle("revealed");
      prev && prev.classList.toggle("revealed");
    };

    const toggleRevealImg = (index) => {
      const next = imgElements[index];
      const prev = imgElements[index - 1];
      next && next.classList.toggle("revealed");
      prev && prev.classList.toggle("revealed");
    };

    gsap.set(imgElements, {
      yPercent: (i) => (i ? 100 : 0)
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: () => "+=" + 100 * imgElements.length + "%",
        markers: true,
        pin: true,
        scrub: 1
      }
    });

    imgElements.forEach((panel, index) => {
      if (index) {
        tl.to(
          panel,
          {
            yPercent: 0,
            ease: "none"
          },
          "+=0.25"
        );
        if (textElements[index]) {
          tl.call(toggleRevealText, [index], "<+=0.125");
        }
      } else {
        tl.call(toggleRevealText, [index], 0.125);
      }
    });

    textElements.forEach((panel, index) => {
      if (index) {
        tl.to(
          panel,
          {
            yPercent: 0,
            ease: "none"
          },
          "+=0.25"
        );
        if (imgElements[index]) {
          tl.call(toggleRevealImg, [index], "<+=0.125");
        }
      } else {
        tl.call(toggleRevealImg, [index], 0.125);
      }
    });

  },
  true
)
