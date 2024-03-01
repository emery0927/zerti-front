import { Directive, ElementRef, Host, Input, Optional, Renderer2, Self, ViewContainerRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Directive({
  selector: '[appStylePaginator]',
  standalone: true
})
export class StylePaginatorDirective {
  private _currentPage = 1;
  private _pageGapTxt = "...";
  private _rangeStart!: number;
  private _rangeEnd!: number;
  private _buttons: string[] = [];;

@Input()
  get showTotalPages(): number { return this._showTotalPages; }
  set showTotalPages(value: number) {
    this._showTotalPages = value % 2 == 0 ? value + 1 : value;
  }
  private _showTotalPages = 2;

  constructor(
    @Host() @Self() @Optional() private readonly matPag: MatPaginator,
    private elementRef: ElementRef,
    private ren: Renderer2
  ) {
    //Sub to rerender buttons when next page and last page is used
    this.matPag.page.subscribe((v)=>{
      console.log(v);

      this.switchPage(v.pageIndex);
    })
  }

  private buildPageNumbers() {
    const actionContainer = this.elementRef.nativeElement.querySelector(
      "div.mat-mdc-paginator-range-actions"
    );
    const nextPageNode = this.elementRef.nativeElement.querySelector(
      "button.mat-mdc-paginator-navigation-next"
    );
    const prevButtonCount = this._buttons.length;

    // remove buttons before creating new ones
    if (this._buttons.length > 0) {
      this._buttons.forEach(button => {
        this.ren.removeChild(actionContainer, button);
      });
      //Empty state array
      this._buttons.length = 0;
    }

    console.log(this._buttons.length);


    //initialize next page and last page buttons
    if (this._buttons.length == 0) {
      let nodeArray = this.elementRef.nativeElement.childNodes[0].childNodes[0]
        .childNodes[2].childNodes;
      setTimeout(() => {
        for (let i = 0; i < nodeArray.length; i++) {
          if (nodeArray[i].nodeName === "BUTTON") {
            if (nodeArray[i].disabled) {
              this.ren.setStyle(
                nodeArray[i],
                "background-color",
                "#856b3ca6"
              );
              this.ren.setStyle(nodeArray[i], "color", "white");
              this.ren.setStyle(nodeArray[i], "margin", ".5%");
            } else {
              this.ren.setStyle(
                nodeArray[i],
                "background-color",
                "#c3994ca6"
              );
              this.ren.setStyle(nodeArray[i], "color", "white");
              this.ren.setStyle(nodeArray[i], "margin", ".5%");
            }
          }
        }
      });
    }

    let dots = false;

    //console.log(this.matPag.getNumberOfPages())

    for (let i = 0; i < this.matPag.getNumberOfPages(); i += 1) {
      //console.log(this._showTotalPages, "-", this._currentPage, "-", this._rangeStart, "-", this._rangeEnd);
      if ((i < this._showTotalPages && this._currentPage < this._showTotalPages && i > this._rangeStart) ||
              (i >= this._rangeStart && i <= this._rangeEnd)) {
                this.ren.insertBefore(
                  actionContainer,
                  this.createButton(i, this.matPag.pageIndex),
                  nextPageNode
                  );
                }
      else if (i > this._rangeEnd && !dots) {
                //console.log(this.matPag.pageIndex)
                this.ren.insertBefore(
                  actionContainer,
                  this.createButton(this._pageGapTxt, this.matPag.pageIndex),
                  nextPageNode
                );
                dots = true;
              }
    }
  }

  private createButton(i: any, pageIndex: number): any {
    const linkBtn = this.ren.createElement("button");
    console.log(linkBtn)
    this.ren.addClass(linkBtn, "mat-fab");
    this.ren.setStyle(linkBtn, "margin", "1%");

    const pagingTxt = isNaN(i) ? this._pageGapTxt : +(i + 1);
    const text = this.ren.createText(pagingTxt + "");

    this.ren.addClass(linkBtn, "mat-custom-page");
    switch (i) {
      case pageIndex:
        this.ren.setAttribute(linkBtn, "disabled", "disabled");
        break;
      case this._pageGapTxt:
        this.ren.listen(linkBtn, "click", () => {
          this.switchPage(this._currentPage + this._showTotalPages);
        });
        break;
      default:
        this.ren.listen(linkBtn, "click", () => {
          this.switchPage(i);
        });
        break;
    }

    this.ren.appendChild(linkBtn, text);
    //Add button to private array for state
    this._buttons.push(linkBtn);
    return linkBtn;
  }

  private initPageRange(): void {
    this._rangeStart = this._currentPage - this._showTotalPages / 2;
    this._rangeEnd = this._currentPage + this._showTotalPages / 2;
    this.buildPageNumbers();
  }

  private switchPage(i: number): void {
    this._currentPage = i;
    this.matPag.pageIndex = i;
    this.initPageRange();
    console.log(this._currentPage);
    console.log(this.matPag.pageIndex);



  }

  public ngAfterViewInit() {
    this.initPageRange();
  }
}
