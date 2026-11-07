import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ProductImage } from '../../shared/modules/ProductImage.module';
import { ProductService } from '../../shared/service/product.service';
import { them } from '../../shared/service/themplate.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit, OnChanges {

  @ViewChild('modalImg') modalImgRef: ElementRef<HTMLImageElement>;
  @ViewChild('zoomViewport') zoomViewportRef: ElementRef<HTMLElement>;

  @Input() src: string;
  @Output() srcChange = new EventEmitter<string>();
  @Input() images: ProductImage[] = [];
  @Input() index: string;
  @Input() alt: string;

  modalOpen = false;
  currentIndex = 0;
  modalImageUrl = '';
  caption = '';
  imageLoading = false;
  zoomed = false;
  scale = 1;
  panX = 0;
  panY = 0;

  private readonly zoomScale = 2.6;
  private touchStartX = 0;
  private touchStartY = 0;
  private loadToken = 0;
  private didSwipe = false;
  private dragging = false;
  private dragMoved = false;
  private lastPointerX = 0;
  private lastPointerY = 0;
  private activePointerId: number = null;

  constructor(public productService: ProductService, public them: them) { }

  ngOnInit() {
    this.syncIndexFromSrc();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['src'] || changes['images']) {
      (this as any).__useLargeImage = false;
      (this as any).__imgErrorHandled = false;
      this.syncIndexFromSrc();
      if (this.modalOpen) {
        this.showCurrentInModal();
      }
    }
  }

  get galleryImages(): ProductImage[] {
    return (this.images || []).filter(img =>
      img && img.Image_Url && !img.Image_Url.toLowerCase().includes('.mp4')
    );
  }

  get previewSrc(): string {
    if (!this.src) {
      return '';
    }
    return this.them.getDisplayImageUrl(this.src, this);
  }

  get hasMultiple(): boolean {
    return this.galleryImages.length > 1;
  }

  get positionLabel(): string {
    const total = this.galleryImages.length;
    if (total === 0) {
      return '';
    }
    return (this.currentIndex + 1) + ' / ' + total;
  }

  get imageTransform(): string {
    return 'translate(' + this.panX + 'px, ' + this.panY + 'px) scale(' + this.scale + ')';
  }

  onPreviewError(event: Event) {
    this.them.onSmallImageError(event, this.src, this);
  }

  openModal() {
    this.syncIndexFromSrc();
    this.modalOpen = true;
    this.showCurrentInModal();
  }

  closeModal() {
    this.modalOpen = false;
    this.imageLoading = false;
    this.resetZoom();
  }

  resetZoom() {
    this.zoomed = false;
    this.scale = 1;
    this.panX = 0;
    this.panY = 0;
    this.dragging = false;
    this.dragMoved = false;
    this.activePointerId = null;
  }

  onPointerDown(event: PointerEvent) {
    if (this.imageLoading || !this.zoomed) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.dragging = true;
    this.dragMoved = false;
    this.activePointerId = event.pointerId;
    this.lastPointerX = event.clientX;
    this.lastPointerY = event.clientY;
    const target = event.currentTarget as HTMLElement;
    if (target && target.setPointerCapture) {
      try {
        target.setPointerCapture(event.pointerId);
      } catch (e) { }
    }
  }

  onPointerMove(event: PointerEvent) {
    if (!this.dragging || !this.zoomed) {
      return;
    }
    if (this.activePointerId != null && event.pointerId !== this.activePointerId) {
      return;
    }
    event.preventDefault();
    const dx = event.clientX - this.lastPointerX;
    const dy = event.clientY - this.lastPointerY;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
      this.dragMoved = true;
    }
    this.panX += dx;
    this.panY += dy;
    this.lastPointerX = event.clientX;
    this.lastPointerY = event.clientY;
    this.clampPan();
  }

  onPointerUp(event: PointerEvent) {
    if (this.imageLoading) {
      return;
    }
    event.stopPropagation();

    if (this.didSwipe) {
      this.didSwipe = false;
      this.dragging = false;
      this.activePointerId = null;
      return;
    }

    const wasDragging = this.dragging;
    const moved = this.dragMoved;
    this.dragging = false;
    this.activePointerId = null;

    if (this.zoomed) {
      if (wasDragging && moved) {
        return;
      }
      this.resetZoom();
      return;
    }

    this.zoomAtPoint(event.clientX, event.clientY);
  }

  goNext() {
    const list = this.galleryImages;
    if (list.length < 2) {
      return;
    }
    this.resetZoom();
    this.currentIndex = (this.currentIndex + 1) % list.length;
    this.applyIndexToSrc();
    this.showCurrentInModal();
  }

  goPrev() {
    const list = this.galleryImages;
    if (list.length < 2) {
      return;
    }
    this.resetZoom();
    this.currentIndex = (this.currentIndex - 1 + list.length) % list.length;
    this.applyIndexToSrc();
    this.showCurrentInModal();
  }

  onModalImageLoad() {
    this.finishImageLoad(this.loadToken);
  }

  onModalImageError() {
    this.finishImageLoad(this.loadToken);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (!this.modalOpen) {
      return;
    }
    if (event.key === 'Escape') {
      this.closeModal();
      return;
    }
    if (this.zoomed) {
      return;
    }
    if (event.key === 'ArrowLeft') {
      this.goNext();
      event.preventDefault();
    } else if (event.key === 'ArrowRight') {
      this.goPrev();
      event.preventDefault();
    }
  }

  onTouchStart(event: TouchEvent) {
    if (!event.changedTouches || !event.changedTouches.length) {
      return;
    }
    this.touchStartX = event.changedTouches[0].clientX;
    this.touchStartY = event.changedTouches[0].clientY;
  }

  onTouchEnd(event: TouchEvent) {
    if (!this.modalOpen || this.zoomed || !event.changedTouches || !event.changedTouches.length) {
      return;
    }
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;
    const dx = endX - this.touchStartX;
    const dy = endY - this.touchStartY;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) {
      return;
    }
    this.didSwipe = true;
    if (dx < 0) {
      this.goNext();
    } else {
      this.goPrev();
    }
  }

  private zoomAtPoint(clientX: number, clientY: number) {
    const viewport = this.zoomViewportRef && this.zoomViewportRef.nativeElement;
    if (!viewport) {
      this.scale = this.zoomScale;
      this.zoomed = true;
      return;
    }
    const rect = viewport.getBoundingClientRect();
    const offsetX = clientX - rect.left - rect.width / 2;
    const offsetY = clientY - rect.top - rect.height / 2;
    this.scale = this.zoomScale;
    this.panX = -offsetX * (this.scale - 1);
    this.panY = -offsetY * (this.scale - 1);
    this.zoomed = true;
    this.clampPan();
  }

  private clampPan() {
    const viewport = this.zoomViewportRef && this.zoomViewportRef.nativeElement;
    if (!viewport || this.scale <= 1) {
      this.panX = 0;
      this.panY = 0;
      return;
    }
    const rect = viewport.getBoundingClientRect();
    const maxX = (rect.width * (this.scale - 1)) / 2 + 40;
    const maxY = (rect.height * (this.scale - 1)) / 2 + 40;
    this.panX = Math.max(-maxX, Math.min(maxX, this.panX));
    this.panY = Math.max(-maxY, Math.min(maxY, this.panY));
  }

  private syncIndexFromSrc() {
    const list = this.galleryImages;
    if (!list.length) {
      this.currentIndex = 0;
      return;
    }
    const idx = list.findIndex(a => a.Image_Url === this.src);
    this.currentIndex = idx >= 0 ? idx : 0;
  }

  private applyIndexToSrc() {
    const list = this.galleryImages;
    if (!list.length) {
      return;
    }
    const item = list[this.currentIndex];
    if (item) {
      this.src = item.Image_Url;
      this.caption = item.Description || this.alt || '';
      this.srcChange.emit(this.src);
    }
  }

  private showCurrentInModal() {
    this.resetZoom();
    const list = this.galleryImages;
    this.beginImageLoad();
    if (!list.length) {
      this.modalImageUrl = this.them.getLargeImageFullUrl(this.src);
      this.caption = this.alt || '';
      return;
    }
    const item = list[this.currentIndex] || list[0];
    this.src = item.Image_Url;
    this.modalImageUrl = this.them.getLargeImageFullUrl(item.Image_Url);
    this.caption = item.Description || this.alt || '';
    this.srcChange.emit(this.src);
  }

  private beginImageLoad() {
    this.loadToken += 1;
    const token = this.loadToken;
    this.imageLoading = true;

    setTimeout(() => {
      if (token !== this.loadToken) {
        return;
      }
      const img = this.modalImgRef && this.modalImgRef.nativeElement;
      if (img && img.complete && img.naturalWidth > 0) {
        this.finishImageLoad(token);
      }
    }, 0);
  }

  private finishImageLoad(token: number) {
    if (token !== this.loadToken) {
      return;
    }
    this.imageLoading = false;
  }
}
