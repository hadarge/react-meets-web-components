import {Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';

/**
 * Web Components Workshop - Angular Integration
 *
 * This Angular app demonstrates how to consume React-wrapped Web Components
 * built in another framework. This showcases the framework-agnostic nature
 * of Web Components.
 *
 * Key Learning Points:
 * 1. How to import and use web components in Angular
 * 2. Angular-specific syntax for passing props (using ElementRef and ViewChild)
 * 3. Attribute vs Property binding in Angular
 * 4. Reactive state with web components
 * 5. Event handling from web components
 */

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App implements AfterViewInit {
  protected title = 'Angular + React Web Components';

  // ============================================================================
  // WORKSHOP SECTION 1: Basic Setup & State
  // ============================================================================
  // Angular uses regular class properties for state. When we update these values,
  // we need to manually update the web component attributes/properties.

  protected link1 = 'https://www.w3schools.com/html/mov_bbb.mp4';
  protected link2 = 'https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4';

  // Current video source - changes will propagate to <video-player>
  protected currentLink = this.link1;

  // Like count - demonstrates two-way communication
  protected likeCount = 88;

  // Track which player is currently playing (for single-play behavior)
  protected activePlayer: 'player1' | 'player2' | null = null;

  // ============================================================================
  // WORKSHOP SECTION 2: ViewChild References
  // ============================================================================
  // Angular uses ViewChild to get direct access to DOM elements
  // This is necessary for setting function properties on web components

  @ViewChild('likeBtn') likeBtn!: ElementRef;
  @ViewChild('player1') player1!: ElementRef;
  @ViewChild('player2') player2!: ElementRef;

  // ============================================================================
  // WORKSHOP SECTION 3: Lifecycle & Direct DOM Access
  // ============================================================================
  // ngAfterViewInit is called after the view is initialized
  // This is where we set function properties on web components

  ngAfterViewInit() {
    console.log(
      `%c🎓 Angular Workshop App Initialized!%c Web Components loaded from React build`,
      'background: #dd0031; color: white; font-weight: bold; padding: 8px; border-radius: 4px;',
      'color: gray; margin-left: 8px;'
    );

    // Set up event handlers for like button
    // Note: Function properties MUST be set via JavaScript, not HTML attributes
    if (this.likeBtn?.nativeElement) {
      (this.likeBtn.nativeElement as any).onLikeChange = this.likeChanged.bind(this);
    }

    // Set up event handlers for video players
    if (this.player1?.nativeElement) {
      (this.player1.nativeElement as any).onPlay = this.onPlay1.bind(this);
      (this.player1.nativeElement as any).onPause = this.onPause1.bind(this);
    }

    if (this.player2?.nativeElement) {
      (this.player2.nativeElement as any).onPlay = this.onPlay2.bind(this);
      (this.player2.nativeElement as any).onPause = this.onPause2.bind(this);
    }
  }

  // ============================================================================
  // WORKSHOP SECTION 4: Attribute Updates
  // ============================================================================
  // This demonstrates how Angular updates work with web components

  changeSrc() {
    this.currentLink = this.currentLink === this.link1 ? this.link2 : this.link1;
    console.log(
      `%c🔄 VIDEO SWITCH%c Changed video source to: %c${this.currentLink === this.link1 ? 'Big Buck Bunny' : 'Sintel'}`,
      'color: #dd0031; font-weight: bold;',
      'color: gray;',
      'color: orange; font-weight: bold;'
    );
  }

  // Example: Programmatically update like count
  incrementLikes() {
    this.likeCount += 10;
    console.log(
      `%c📈 LIKES INCREMENTED (from Angular)%c New count: %c${this.likeCount}`,
      'color: #dd0031; font-weight: bold;',
      'color: gray;',
      'color: blue; font-weight: bold;'
    );

    // Debug: Check the actual DOM attribute value
    const likeBtn = this.likeBtn?.nativeElement;
    if (likeBtn) {
      console.log(
        `%c🔍 DEBUG%c DOM attribute value: %c${likeBtn.getAttribute('likeCount')}`,
        'color: purple; font-weight: bold;',
        'color: gray;',
        'color: orange; font-weight: bold;'
      );
    }
  }

  // ============================================================================
  // WORKSHOP SECTION 5: Event Handlers (Child → Parent Communication)
  // ============================================================================
  // These callbacks are passed to web components via direct property assignment
  // This is Angular's way of setting JavaScript properties (not HTML attributes)

  // Like Button Events
  likeChanged(value: boolean, counter: number) {
    console.log(
      `%c💗 LIKE EVENT (from <like-button>)%c Liked: %c${value}%c | Count: %c${counter}`,
      'color: #dd0031; font-weight: bold;',
      'color: gray;',
      value ? 'color: green; font-weight: bold;' : 'color: orange; font-weight: bold;',
      'color: gray;',
      'color: blue; font-weight: bold;'
    );

    // Example: Sync with Angular state (optional)
    this.likeCount = counter;

    // Example: Make API call
    // this.http.post('/api/likes', { value, counter }).subscribe();
  }

  // Video Player 1 Events
  onPlay1() {
    this.activePlayer = 'player1';
    console.log(
      `%c▶️ PLAY EVENT (Player 1)%c Video started playing`,
      'color: #dd0031; font-weight: bold;',
      'color: gray;'
    );

    // Example: Pause other players for single-play behavior
    // Note: You'd need to expose a pause() method on the web component
  }

  onPause1() {
    if (this.activePlayer === 'player1') {
      this.activePlayer = null;
    }
    console.log(
      `%c⏸️ PAUSE EVENT (Player 1)%c Video paused`,
      'color: orange; font-weight: bold;',
      'color: gray;'
    );
  }

  // Video Player 2 Events (demonstrates multiple instances)
  onPlay2() {
    this.activePlayer = 'player2';
    console.log(
      `%c▶️ PLAY EVENT (Player 2)%c Video started playing`,
      'color: #dd0031; font-weight: bold;',
      'color: gray;'
    );
  }

  onPause2() {
    if (this.activePlayer === 'player2') {
      this.activePlayer = null;
    }
    console.log(
      `%c⏸️ PAUSE EVENT (Player 2)%c Video paused`,
      'color: orange; font-weight: bold;',
      'color: gray;'
    );
  }
}