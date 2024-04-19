import { AfterViewInit, Directive, ElementRef, EventEmitter, Host, Input, OnChanges, Optional, Output, Renderer2, Self, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { map, startWith } from 'rxjs';

@Directive({
  selector: '[appBubblePagination]',
  standalone: true
})
export class BubblePaginationDirective implements AfterViewInit, OnChanges {

  /**
   * declarar la variable auxiliar prevIndexAux con valor inicial 0.
   */
  prevIndexAux: number = 0;

  /**
   * emisor de eventos personalizado para el componente padre.
   */
  @Output() pageIndexChangeEmitter: EventEmitter<number> =
    new EventEmitter<number>();

  /**
   * si queremos mostrar el primer/último botón y los puntos.
   */
  @Input() showFirstButton = true;
  @Input() showLastButton = true;

  @Input() filter: any;

  /**
   * cuántos botones mostrar antes y después del botón seleccionado.
   */
  @Input() renderButtonsNumber = 1;

  /**
   * cuántos elementos hay en la tabla.
   */
  @Input() appCustomLength: number = 0;

  /**
   * definir true para ocultar las flechas izquierda y derecha que rodean las burbujas.
   */
  @Input() hideDefaultArrows = false;

  /**
   * referencias a los elementos del DOM.
   */
  private dotsEndRef!: HTMLElement;
  private dotsStartRef!: HTMLElement;
  private bubbleContainerRef!: HTMLElement;

  // guardar los botones renderizados en la interfaz de usuario para poder eliminarlos cuando cambie el índice de la página.
  private buttonsRef: HTMLElement[] = [];

  constructor(
    @Host() @Self() @Optional() private readonly matPag: MatPaginator,
    private elementRef: ElementRef,
    private ren: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.styleDefaultPagination();
    this.createBubbleDivRef();
    this.renderButtons();
  }

  /**
   * reacciona cuando el componente padre cambia la appCustomLength, entonces rerenderiza las burbujas.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if(!changes?.['appCustomLength']?.firstChange && this.appCustomLength/this.matPag.pageSize > 1) {
      this.removeButtons();
      this.removeDotsEndElement();
      this.removeDotsStartElement();
      this.styleDefaultPagination();
      this.createBubbleDivRef();
      this.buildButtons();
      this.switchPage(0);
    } else if (!changes?.['appCustomLength']?.firstChange && this.appCustomLength/this.matPag.pageSize < 1) {

      this.removeButtons();
      this.removeDotsEndElement();
      this.removeDotsStartElement();

    } else if (!changes?.['appCustomLength']?.firstChange) {
      // elimina botones antes de crear otros nuevos.
      this.removeButtons();
      // volver a la página 0.
      this.switchPage(0);
      this.renderButtons();
    }
  }

  private renderButtons(): void {
    //debugger;
    // crear botones en la interfaz de usuario.
    this.buildButtons();

    // al cambiar la paginación -> cambiar el estilo de los botones.
    this.matPag.page
      .pipe(
        map((e) => [e.previousPageIndex ?? 0, e.pageIndex]),
        startWith([0, 0])
      )
      .subscribe(([prev, curr]) => {
        this.changeActiveButtonStyles(prev, curr);
      });
  }


  /**
   * cambiar el estilo del botón activo por el actual y
   * mostrar/ocultar botones adicionales en función del índice navegado.
   */
  private changeActiveButtonStyles(previousIndex: number, newIndex: number) {
    this.prevIndexAux, newIndex;
  /**
   * valida que en el newIndex que llega negativo
   * porque la entrada fue borrada y puesta a índice 0, se cambie a 0.
   */
    if (newIndex < 0) {
      newIndex = 0;
    }

    this.prevIndexAux, newIndex;


    const previouslyActive = this.buttonsRef[this.prevIndexAux];
    const currentActive = this.buttonsRef[newIndex];

  /**
   * se utiliza un atributo auxiliar para mantener el índice previo real,
   * ya que cuando se elimina la entrada se pone en 0.
   */
    this.prevIndexAux = newIndex;

    if(previouslyActive == undefined) {

    } else {
      // eliminar el estilo activo del botón previamente activo.
      this.ren.removeClass(previouslyActive, 'g-bubble__active');
      // añadir estilo activo al nuevo botón activo.
      this.ren.addClass(currentActive, 'g-bubble__active');

      // ocultar todos los botones.
      this.buttonsRef.forEach((button) =>
        this.ren.setStyle(button, 'display', 'none')
      );

      // mostrar N botones anteriores y X botones siguientes.
      const renderElements = this.renderButtonsNumber;
      const endDots = newIndex < this.buttonsRef.length - renderElements - 1;
      const startDots = newIndex - renderElements > 0;

      const firstButton = this.buttonsRef[0];
      const lastButton = this.buttonsRef[this.buttonsRef.length - 1];

      // última burbuja y puntos.
      if (this.showLastButton) {
        this.ren.setStyle(this.dotsEndRef, 'display', endDots ? 'block' : 'none');
        this.ren.setStyle(lastButton, 'display', endDots ? 'flex' : 'none');
      }

      // primera burbuja y puntos.
      if (this.showFirstButton) {
        this.ren.setStyle(
          this.dotsStartRef,
          'display',
          startDots ? 'block' : 'none'
        );
        this.ren.setStyle(firstButton, 'display', startDots ? 'flex' : 'none');
      }

      // resuelve el índice inicial y final para mostrar los botones.
      const startingIndex = startDots ? newIndex - renderElements : 0;

      const endingIndex = endDots
        ? newIndex + renderElements
        : this.buttonsRef.length - 1;

      // botones de inicio de pantalla.
      for (let i = startingIndex; i <= endingIndex; i++) {
        const button = this.buttonsRef[i];
        this.ren.setStyle(button, 'display', 'flex');
      }
    }

  }

  /**
   * elimina o cambia el estilo de algunos elementos html.
   */
  private styleDefaultPagination() {
    const {nativeElement} = this.elementRef;
    const itemsPerPage = nativeElement.querySelector(
      '.mat-mdc-paginator-page-size'
    );
    const howManyDisplayedEl = nativeElement.querySelector(
      '.mat-mdc-paginator-range-label'
    );
    const previousButton = nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-previous'
    );
    const nextButtonDefault = nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-next'
    );

    // eliminar "elementos por página".
    this.ren.setStyle(itemsPerPage, 'display', 'none');

    // estilo de texto de cuántos elementos se muestran actualmente.
    this.ren.setStyle(howManyDisplayedEl, 'position', 'absolute');
    this.ren.setStyle(howManyDisplayedEl, 'display', 'none');
    this.ren.setStyle(howManyDisplayedEl, 'left', '0');
    this.ren.setStyle(howManyDisplayedEl, 'color', '#919191');
    this.ren.setStyle(howManyDisplayedEl, 'font-size', '14px');

    // comprobar si el usuario desea eliminar la flecha izquierda y derecha por defecto.
    if (this.hideDefaultArrows) {
      this.ren.setStyle(previousButton, 'display', 'none');
      this.ren.setStyle(nextButtonDefault, 'display', 'none');
    }
  }

  /**
   * crea 'bubbleContainerRef' donde se mostrarán todos los botones.
   */
  private createBubbleDivRef(): void {
    const actionContainer = this.elementRef.nativeElement.querySelector(
      'div.mat-mdc-paginator-range-actions'
    );
    const nextButtonDefault = this.elementRef.nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-next'
    );

    // crear un elemento HTML donde se mostrarán todas las burbujas.
    this.bubbleContainerRef = this.ren.createElement('div') as HTMLElement;
    this.ren.addClass(this.bubbleContainerRef, 'g-bubble-container');
    this.ren.setStyle(this.bubbleContainerRef, 'display', 'flex');
    this.ren.setStyle(this.bubbleContainerRef, 'cursor', 'pointer');

    // renderizar el elemento antes de que se muestre el 'botón siguiente'.
    this.ren.insertBefore(
      actionContainer,
      this.bubbleContainerRef,
      nextButtonDefault
    );
  }

  /**
   * función auxiliar que construye todos los botones
   * y añade puntos entre el primer botón, el resto y el último botón.
   *
   * resultado: (1) .... (4) (5) (6) ... (25)
   */
  private buildButtons(): void {
    const neededButtons = Math.ceil(
      this.appCustomLength / this.matPag.pageSize
    );

    // crea el primer botón.
    this.buttonsRef = [this.createButton(0)];

    // añadir puntos (....) a la interfaz de usuario.
    this.dotsStartRef = this.createDotsElement();

    // crea todos los botones necesarios para la navegación (excepto el primero y el último).
    for (let index = 1; index < neededButtons - 1; index++) {
      this.buttonsRef = [...this.buttonsRef, this.createButton(index)];
    }

    // añadir puntos (....) a la interfaz de usuario.
    this.dotsEndRef = this.createDotsElement();

    // crea el último botón a IU después de los puntos (....)
    if (neededButtons != 1){
      this.buttonsRef = [
        ...this.buttonsRef,
        this.createButton(neededButtons - 1),
      ];
    }
  }

  removeDotsStartElement() {
    if (this.dotsStartRef && this.dotsStartRef.parentNode) {
        this.dotsStartRef.parentNode.removeChild(this.dotsStartRef);
    }
}

// Método para eliminar los puntos suspensivos al final
  removeDotsEndElement() {
    if (this.dotsEndRef && this.dotsEndRef.parentNode) {
        this.dotsEndRef.parentNode.removeChild(this.dotsEndRef);
    }
}

  /**
   * eliminar todos los botones del DOM.
   */
  private removeButtons(): void {
    this.buttonsRef.forEach((button) => {
      this.ren.removeChild(this.bubbleContainerRef, button);
    });

    // array de estados vacío.
    this.buttonsRef.length = 0;
  }

  /**
   * crear el elemento HTML botón.
   */
  private createButton(i: number): HTMLElement {
    const bubbleButton = this.ren.createElement('div');
    const text = this.ren.createText(String(i + 1));

    // añade clase y texto.
    this.ren.addClass(bubbleButton, 'g-bubble');
    this.ren.setStyle(bubbleButton, 'margin-right', '15px');
    this.ren.appendChild(bubbleButton, text);

    // reacciona al click.
    this.ren.listen(bubbleButton, 'click', () => {
      this.switchPage(i);
    });

    // renderiza en la interfaz de usuario.
    this.ren.appendChild(this.bubbleContainerRef, bubbleButton);

    // cambia el estilo a 'none' por defecto.
    this.ren.setStyle(bubbleButton, 'display', 'none');

    return bubbleButton;
  }

  /**
   * función auxiliar para crear puntos (....) en DOM
   * indicando que hay muchas más burbujas hasta la última.
   */
  private createDotsElement(): HTMLElement {
    const dotsEl = this.ren.createElement('span');
    const dotsText = this.ren.createText('...');

    // añadir clase
    this.ren.setStyle(dotsEl, 'font-size', '18px');
    this.ren.setStyle(dotsEl, 'margin-right', '10px');
    this.ren.setStyle(dotsEl, 'padding-top', '6px');
    this.ren.setStyle(dotsEl, 'color', '#8f5b35');

    // adjuntar texto al elemento.
    this.ren.appendChild(dotsEl, dotsText);

    // renderizar puntos en la interfaz de usuario.
    this.ren.appendChild(this.bubbleContainerRef, dotsEl);

    // cambiar el estilo a 'none' por defecto.
    this.ren.setStyle(dotsEl, 'display', 'none');

    return dotsEl;
  }

  /**
   * Función auxiliar para cambiar de página.
   */
  private switchPage(i: number): void {
    const previousPageIndex = this.matPag.pageIndex;
    this.matPag.pageIndex = i;
    this.matPag['_emitPageEvent'](previousPageIndex);

    this.pageIndexChangeEmitter.emit(i);
  }

}
