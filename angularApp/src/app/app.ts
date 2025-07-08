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
      console.log('likeChanged @angular compoent', value, count);
    }
  }
}
