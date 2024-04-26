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

    const textElements = gsap.utils.toArray('.textelements')

    const toggleRevealText = (index) => {
      console.log(index)
      textElements.forEach((text) => {
        text.classList.remove('revealed')
      })

      textElements[index].classList.add('revealed')
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.container',
        start: 'top top',
        end: () => '+=' + 100 * textElements.length + '%',
        markers: true,
        pin: true,
        scrub: 1
      }
    })

    textElements.forEach((panel, index) => {
      tl.to(
        panel,
        {
          yPercent: 0,
          ease: 'none'
        },
        '+=0.25'
      )

      tl.call(toggleRevealText, [index], '<+=0.0')
    })
  },
  true
)
