import { trigger, state, style, transition, animate } from '@angular/animations';


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
  transition('close => open', animate('5s ease-in')),
  transition('open => close', animate('250ms ease-out')),
]);


export const onMainContentChange = trigger('onMainContentChange', [
  state('close',
    style({
      'margin-left': '62px'
    })
  ),
  state('open',
    style({
      'margin-left': '0px'
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
      'font-size': '.9375rem',
      'font-family': 'Lato, sans-serif'
    })
  ),
  transition('close => open', animate('250ms ease-in')),
  transition('open => close', animate('200ms ease-out')),
]);

export const expandCollapse = trigger('expandCollapse', [
  state('collapsed', style({
    width: '0',
    display: 'none'
  })),
  state('expanded', style({
    width: '*',
    display: 'block'
  })),
  transition('collapsed <=> expanded', animate('250ms ease-out'))
]);
