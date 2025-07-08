import {Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App {
  protected title = 'angularApp';

  @ViewChild('likeBtn') likeBtn!: ElementRef;

  ngAfterViewInit() {
    (this.likeBtn.nativeElement as any).onLikeChange = (value: boolean, count: number) => {
      console.log(
        `%c🅰️ likeChanged%c @angular component %c${value}%c, count: %c${count}`,
        'color: #dd0031; font-weight: bold;',     // Angular red
        'color: gray;',
        'color: orange; font-weight: bold;',
        'color: gray;',
        'color: teal; font-weight: bold;'
      );
    }
  }
}
