import { trigger, state, style, transition, animate, animateChild, query } from '@angular/animations';


export const onSideNavChange = trigger('onSideNavChange', [
  state('close',
    style({
      'min-width': '50px'
    })
  ),
  state('open',
    style({
      'min-width': '200px'
    })
  ),
  transition('close => open', animate('250ms ease-in')),
  transition('open => close', animate('250ms ease-in')),
]);


export const onMainContentChange = trigger('onMainContentChange', [
  state('close',
    style({
      'margin-left': '62px'
    })
  ),
  state('open',
    style({
      'margin-left': '370px'
    })
  ),
  transition('close => open', animate('250ms ease-in')),
  transition('open => close', animate('250ms ease-in')),
]);


export const animateText = trigger('animateText', [
  state('hide',
    style({
      'display': 'none',
      opacity: 0,
    })
  ),
  state('show',
    style({
      'display': 'inline-block',
      opacity: 1,
      'margin-left': '10px',
      'font-weight': '400',
    })
  ),
  transition('close => open', animate('350ms ease-in')),
  transition('open => close', animate('200ms ease-out')),
]);


