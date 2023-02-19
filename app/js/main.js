//aos -----------------------------------------------------


document.querySelectorAll('main .container > * > *').forEach(item => {
   const parent = item.parentElement.classList;
   if (parent.contains('offer__body') || parent.contains('politics__body') || parent.contains('logotypes__body') || parent.contains('screenshots__body') || parent.contains('banners__body')) {
      if (!item.classList.contains('slider')) item.querySelectorAll('*').forEach(item => item.dataset.aos = 'zoom-in-up');
   } else if (!item.matches('.plan__background, .brands__image')) item.dataset.aos = 'zoom-in-up';
});

AOS.init({
   offset: 20
});


//brand spoiler ------------------------------------------- 

if (document.querySelectorAll('._spoilerContent').length > 0) {


   let _slideUp = (target, duration = 500) => {
      if (!target.classList.contains('_slide')) {
         target.parentNode.querySelector('.brands__markets-show--more').style.removeProperty('display');
         target.classList.add('_slide');
         target.style.transitionProperty = 'height, margin, padding';
         target.style.transitionDuration = duration + 'ms';
         target.style.height = target.offsetHeight + 'px';
         target.offsetHeight;
         target.style.overflow = 'hidden';
         target.style.height = 0;
         target.style.paddingTop = 0;
         target.style.paddingBottom = 0;
         target.style.marginTop = 0;
         target.style.marginBottom = 0;
         window.setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
         }, duration);
      }
   }

   let _slideDown = (target, duration = 500) => {
      if (!target.classList.contains('_slide')) {
         target.classList.add('_slide');
         if (target.style.display) {
            target.style.removeProperty('display');
         }
         target.parentNode.querySelector('.brands__markets-show--more').style.display = 'none';
         let height = target.offsetHeight;
         target.style.overflow = 'hidden';
         target.style.height = 0;
         target.style.paddingTop = 0;
         target.style.paddingBottom = 0;
         target.style.marginTop = 0;
         target.style.marginBottom = 0;
         target.offsetHeight;
         target.style.transitionProperty = 'height, margin, padding';
         target.style.transitionDuration = duration + 'ms';
         target.style.height = height + 'px';
         target.style.removeProperty('padding-top');
         target.style.removeProperty('padding-bottom');
         target.style.removeProperty('margin-top');
         target.style.removeProperty('margin-bottom');
         window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
         }, duration);
      }
   }
   let _slideToggle = (target, duration = 500) => {
      if (target.style.display) {
         return _slideDown(target, duration);
      } else {
         return _slideUp(target, duration);
      }
   }

   document.querySelectorAll('._spoilerContent').forEach(item => {
      if (item.classList.contains('_hidden')) {
         _slideUp(item, 0)
      } else {
         _slideDown(item, 0)
      }
   })
   document.querySelectorAll('.brands__markets-show').forEach(item => item.addEventListener('click', e => {
      _slideToggle(e.target.parentNode.parentNode.querySelector('._spoilerContent'), 500);
   }));
}


//slider --------------------------------------------------

if (document.querySelectorAll('.slider').length > 0) {

   document.querySelectorAll('.slider').forEach(slider => {

      if (document.documentElement.clientWidth <= 1024) {
         slider.dataset.visible = 1
      }

      let slidesVisible = slider.dataset.visible;
      let index = 0;
      let track = slider.querySelector('.slider__track');
      let slides = slider.querySelectorAll('.slider__slide');
      let slidesLength = slides.length;

      let slideWidth = slider.querySelector('.slider__wrapper').offsetWidth / slidesVisible;
      slides.forEach(item => {
         item.style.width = slideWidth + 'px';
         if (slidesVisible == 1) item.style.padding = 0;
      });
      track.style.width = slideWidth * slidesLength + 'px';






      if (slider.querySelector('.slider__dots')) {

         // creating dots and add active to first dot -------------------------
         let dotsContainer = slider.querySelector('.slider__dots');
         for (i = 0; i < slidesLength; i++) {
            let sliderDot = document.createElement('button');
            sliderDot.classList.add('slider__dot')
            dotsContainer.append(sliderDot)
         }
         let dots = slider.querySelectorAll('.slider__dot');
         dots[0].classList.add('active');
         // -------------------------------------------------------------------



         dots.forEach((dotItem, dotIndex) => {
            dotItem.addEventListener('click', () => {
               if (!track.classList.contains('_shifting') && !dotItem.classList.contains('active')) {
                  anim(300)
                  dotFunc(dotIndex)

                  dots.forEach(item => item.classList.remove('active'));
                  dots[Math.abs(index)].classList.add('active')
               }
            });
         });
      }


      slider.addEventListener('click', e => {

         if (!track.classList.contains('_shifting')) {

            if (e.target.closest('.slider__control--prev')) {
               anim(300);
               prev();

            }
            if (e.target.closest('.slider__control--next')) {
               anim(300)
               next();

            }
            if (slider.querySelector('.slider__dots')) {
               let dots = slider.querySelectorAll('.slider__dot');
               dots.forEach(item => item.classList.remove('active'));
               dots[Math.abs(index)].classList.add('active');
            }
         }


      });

      let dotFunc = (dotIndex) => {
         index = -dotIndex;
         track.style.left = slideWidth * index + 'px';
      }



      let anim = (duration = 500) => {
         track.classList.add('_shifting');
         track.style.transitionProperty = 'left';
         track.style.transitionDuration = duration + 'ms';

         setTimeout(() => {
            track.style.removeProperty('transition-property');
            track.style.removeProperty('transition-duration');
            track.classList.remove('_shifting');
         }, duration)
      }

      let prev = () => {

         if (Math.abs(index) <= 0) {
            track.style.left = slideWidth * -(slidesLength - slidesVisible) + 'px';
            index = -(slidesLength - slidesVisible);
         } else {
            track.style.left = slideWidth * ++index + 'px';
         }
      }



      let next = () => {

         if (Math.abs(index) >= slidesLength - slidesVisible) {
            track.style.left = 0;
            index = 0
         } else {
            track.style.left = slideWidth * --index + 'px';
         }
      }

   });
}

//faq -----------------------------------------------------

if (document.querySelectorAll('.faq__text').length > 0) {
   document.querySelectorAll('.faq__text').forEach(item => {
      let textHeight = item.offsetHeight;
      let itemSubtitle = item.previousElementSibling;
      let allSubtitles = document.querySelectorAll('.faq__subtitle');
      item.style.maxHeight = 0;
      itemSubtitle.addEventListener('click', e => {
         document.querySelectorAll('.faq__text').forEach(item => {
            item.classList.remove('active');
            item.style.maxHeight = 0;
         });
         if (!e.target.classList.contains('active')) {
            allSubtitles.forEach(item => item.classList.remove('active'));
            e.target.classList.add('active');
            item.classList.add('active');
            item.style.maxHeight = textHeight + 'px';
         } else {
            e.target.classList.remove('active');
         }
      })
   });
}

//plan-graph ----------------------------------------------

if (document.querySelector('.plan__graph')) {
   document.querySelectorAll('.plan__graph-background').forEach(item => {
      let bgWidth = item.nextElementSibling.innerHTML;
      item.style.width = bgWidth;
   })
}


//popup ---------------------------------------------------

let popupEl = document.querySelector('.popup');
let popupBodies = document.querySelectorAll('.popup__body');
let popupAuth = document.querySelector('.auth');


//calc selector -------------------------------------------

if (document.querySelector('._calculator')) {
   let calcSelector = document.querySelector('.calc__selector');
   let calcOptions = calcSelector.querySelectorAll('.calc__option');
   calcSelector.querySelectorAll('.calc__option--trigger').forEach(item => {
      item.addEventListener('click', e => {
         if (!calcSelector.classList.contains('opened')) {
            calcSelector.classList.add('opened');
         } else {
            calcSelector.classList.remove('opened');
         }
      });
   });
   calcSelector.querySelectorAll('.calc__option--hidden').forEach(item => {
      item.addEventListener('click', () => {
         calcOptions.forEach(item => {
            if (!item.classList.contains('active')) {
               item.classList.add('active');
            } else {
               item.classList.remove('active');
            }
         });
         calcSelector.classList.remove('opened');
      });
   });


   //calc validation --------------------------------------

   document.querySelector('.calc__form-input').addEventListener('input', e => {
      let value = e.target.value;
      e.target.value = value.replace(/\D/g, '');
   })
}


//auth validation -----------------------------------------

document.querySelectorAll('.auth__input[required]').forEach(item => {
   item.addEventListener('blur', e => {
      if (!item.value) {
         item.parentElement.classList.add('error');
      } else {
         item.parentElement.classList.remove('error')
      }
   })
})

document.querySelector('.auth__input--tel').addEventListener('input', e => {
   let value = e.target.value;
   e.target.value = value.replace(/\D/g, '');
})


//auth tabs -----------------------------------------------

let authTabToggle = e => {
   if (e.target.closest('._login-tab')) {
      popupAuth.querySelector('.registration').classList.remove('active');
      popupAuth.querySelector('._registration-tab').classList.remove('active');
      popupAuth.querySelector('.login').classList.add('active');
      popupAuth.querySelector('._login-tab').classList.add('active');
   }

   if (e.target.closest('._registration-tab')) {
      popupAuth.querySelector('.login').classList.remove('active');
      popupAuth.querySelector('._login-tab').classList.remove('active');
      popupAuth.querySelector('.registration').classList.add('active');
      popupAuth.querySelector('._registration-tab').classList.add('active');
   }
}


//close popup ---------------------------------------------

let popupClose = () => {
   document.body.classList.remove('active');
   popupEl.classList.remove('active');
   popupBodies.forEach(item => item.classList.remove('active'));
   setTimeout(() => {
      popupAuth.querySelectorAll('.active').forEach(item => item.classList.remove('active'));
      popupAuth.querySelectorAll('.auth__input').forEach(item => {
         item.value = '';
         item.parentElement.classList.remove('error');
      });
   }, 500);
}


//popup function ------------------------------------------

let popup = e => {

   //close popup ------------------------------------------

   if (popupEl.classList.contains('active') && !e.target.closest('.popup__body') || e.target.closest('.popup__close')) {
      popupClose();
   }


   //calc popup -------------------------------------------

   if (e.target.closest('._calculator')) {
      setTimeout(() => popupEl.querySelector('.popup__body.active').focus(), 500);
      document.body.classList.add('active');
      popupEl.classList.add('active')
      document.querySelector('.calc').classList.add('active');
   }


   //auth popup -------------------------------------------

   if (e.target.closest('._login') || e.target.closest('._registration')) {
      popupEl.querySelector('.popup__body').classList.remove('active');
      setTimeout(() => popupEl.querySelector('.popup__body.active').focus(), 500);
      document.body.classList.add('active');
      popupEl.classList.add('active')
      popupAuth.classList.add('active');

      if (e.target.closest('._login')) {
         popupAuth.querySelector('._login-tab').classList.add('active');
         popupAuth.querySelector('.login').classList.add('active');
      }

      if (e.target.closest('._registration')) {
         popupAuth.querySelector('._registration-tab').classList.add('active');
         popupAuth.querySelector('.registration').classList.add('active');
      }
   }

   authTabToggle(e);

   if (e.target.closest('.auth__input-eye')) {
      let eye = e.target;
      let input = eye.previousElementSibling;
      if (!eye.classList.contains('active')) {
         eye.classList.add('active');
         input.type = 'text'
      } else {
         eye.classList.remove('active');
         input.type = 'password'
      }
   }
}


//click functions ---------------------

document.addEventListener('click', e => {

   //plan switcher ----------------------------------------

   if ((e.target).closest('.plan__switcher-button')) {
      document.querySelectorAll('.plan__background').forEach(item => item.classList.remove('active'));
      document.querySelector(`#background-${e.target.id}`).classList.add('active');
      document.querySelectorAll('.plan__switcher-button').forEach(item => item.classList.remove('active'));
      e.target.classList.add('active');
   }


   //popup ------------------------------------------------

   popup(e);

   //burger -----------------------------------------------

   if (document.querySelector('.header__menu-list').classList.contains('active')) {
      if (!e.target.closest('.header') || e.target.closest('.header__menu-link')) {
         document.querySelector('.burger').classList.remove('active');
         document.body.classList.remove('active');
         document.querySelector('.header__menu-list').classList.remove('active');
      }
   }
   if ((e.target).closest('.burger')) {
      e.target.classList.toggle('active');
      document.body.classList.toggle('active');
      document.querySelector('.header__menu-list').classList.toggle('active');
   }
});


//keydown functions -------------------

document.addEventListener('keydown', e => {

   if (e.code == 'Space' || e.code == 'Enter') {

      if (e.target.closest('label')) {

         if (!e.target.previousElementSibling.checked) {
            e.target.previousElementSibling.checked = true;
         } else {
            e.target.previousElementSibling.checked = false;
         }
         e.preventDefault();

      }
      authTabToggle(e);
   }

   if (popupEl.classList.contains('active') && e.code == 'Escape') {
      popupClose();
   }
});



