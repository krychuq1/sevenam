import { trigger, style, animate, transition, state } from '@angular/animations';


export const scrollUp = [
  trigger('scrollUp', [
    state('inactive', style({ 'top': '0' })),
    state('in', style({ 'bottom': '3500px', 'position': 'absolute' })),
    transition('* <=> *', [
      animate(4000)
    ])
  ])

];
export const fade = [
  trigger('fade', [
    state('in', style({ 'opacity': '1' })),
    state('out', style({ 'opacity': '0' })),
    transition('* <=> *', [
      animate(500)
    ])
  ])

];
