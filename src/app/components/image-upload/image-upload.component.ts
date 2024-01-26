import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {

  imageUrl: string | ArrayBuffer | null = null;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.previewImage(file);
    }
  }

  previewImage(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
  }
}
