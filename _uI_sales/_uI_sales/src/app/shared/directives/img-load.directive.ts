import { Directive, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img[appImgLoad]'
})
export class ImgLoadDirective implements OnInit, OnDestroy {
  private host: HTMLElement;
  private spinner: HTMLElement;
  private observer: MutationObserver;
  private loadToken = 0;

  constructor(
    private el: ElementRef<HTMLImageElement>,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    const img = this.el.nativeElement;
    this.host = this.resolveHost(img);
    if (!this.host) {
      return;
    }

    this.renderer.addClass(this.host, 'img-load-host');
    this.spinner = this.renderer.createElement('span');
    this.renderer.addClass(this.spinner, 'img-load-spinner');
    this.renderer.setAttribute(this.spinner, 'aria-hidden', 'true');
    this.renderer.appendChild(this.host, this.spinner);

    this.beginLoading();

    if (img.complete && img.naturalWidth > 0) {
      this.finishLoading(this.loadToken);
    }

    this.observer = new MutationObserver(() => {
      this.beginLoading();
      setTimeout(() => {
        if (img.complete && img.naturalWidth > 0) {
          this.finishLoading(this.loadToken);
        }
      }, 0);
    });
    this.observer.observe(img, { attributes: true, attributeFilter: ['src'] });
  }

  @HostListener('load')
  onLoad() {
    this.finishLoading(this.loadToken);
  }

  @HostListener('error')
  onError() {
    this.finishLoading(this.loadToken);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.spinner && this.spinner.parentNode) {
      this.renderer.removeChild(this.spinner.parentNode, this.spinner);
    }
    if (this.host) {
      this.renderer.removeClass(this.host, 'img-load-host');
      this.renderer.removeClass(this.host, 'is-loading');
    }
  }

  private resolveHost(img: HTMLElement): HTMLElement {
    const preferred = img.closest(
      '.product-card-media, .newest-card-media, .pd-related-media, .product-image-small, .iv-thumb, .image'
    ) as HTMLElement;
    return preferred || img.parentElement;
  }

  private beginLoading() {
    this.loadToken += 1;
    if (!this.host) {
      return;
    }
    this.renderer.addClass(this.host, 'is-loading');
    this.renderer.addClass(this.el.nativeElement, 'img-is-loading');
  }

  private finishLoading(token: number) {
    if (token !== this.loadToken || !this.host) {
      return;
    }
    this.renderer.removeClass(this.host, 'is-loading');
    this.renderer.removeClass(this.el.nativeElement, 'img-is-loading');
  }
}
