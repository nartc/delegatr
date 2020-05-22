import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'delegatr-layout',
  template: `
    <p>
      layout works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
