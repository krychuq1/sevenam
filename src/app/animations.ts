import {trigger, style, animate, transition, state, keyframes} from '@angular/animations';


export const scrollUp = [
  trigger('scrollUp', [
    state('inactive', style({ 'top': '0' })),
    state('in', style({ 'top': '{{topPos}}px', 'position': 'absolute' })),
    transition('* <=> *', [
      animate(600)
    ])
  ])
];
export const fade = [
  trigger('fade', [
    transition(':leave', [
      animate("500ms ease-in", keyframes([
        style({'top': "-{{topPos}}px"}),
      ]))
    ], {params : { topPos: "30" }})
  ])

];
