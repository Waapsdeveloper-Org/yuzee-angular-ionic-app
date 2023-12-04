/* eslint-disable @typescript-eslint/prefer-for-of */
import {
  Component,
  OnInit,
} from '@angular/core';

import { PhotoLibrary } from '@awesome-cordova-plugins/photo-library/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-load-gallery',
  templateUrl: './load-gallery.component.html',
  styleUrls: ['./load-gallery.component.scss'],
})
export class LoadGalleryComponent implements OnInit {

  albums = [];
  rawArray = [];
  images = [];
  constructor(private photoLibrary: PhotoLibrary,public modalCtrl: ModalController,) { }

  ngOnInit(): void {
    this.getPhotos();
    setTimeout(() => {
      console.log(this.images);
      const uniqueChars = [...new Set(this.rawArray)];
      for (let al = 0; al < uniqueChars.length; al++) {
        const element = uniqueChars[al];
        const param = {
          name: element,
          images: []
        };
        this.albums.push(param);
      }
      this.albums.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      console.log(this.albums);
      this.sortArray();
    }, 5000);
  }

  async getPhotos(): Promise<void> {
    this.photoLibrary.requestAuthorization({ read: true, write: true }).then(() => {
      this.photoLibrary.getLibrary().subscribe({
        next: (library: any) => {
          console.log(library);
          const array = library.library;
          this.images = library.library;
          for (let i = 0; i < array.length; i++) {
            const name = array[i].id.split('/');
            if(name[4] === 'Android'){
              this.rawArray.push(name[7]);
            }else if(name[4] === 'Snapchat'){
              this.rawArray.push(name[4]);
            }else if(name[4] === 'Pictures'){
              this.rawArray.push(name[4]);
            }else{
              this.rawArray.push(name[5]);
            }
          }
        },
        error: (err) => { console.log('could not get photos' + err); },
        complete: () => {
          console.log('done getting photos');
        }
      });
    })
      .catch((err) => console.log('permissions weren\'t granted' + err));
  }

  sortArray(): void {
    const array = [];
    for (let a = 0; a < this.albums.length; a++) {
      const album = this.albums[a];
      for (let i = 0; i < this.images.length; i++) {
        const image = this.images[i];
        if(image.id.includes(album.name)){
          array.push(image);
          album.images.push(image);
        }
      }
    }
    console.log(this.albums);

  }

  async getAlbum(): Promise<void> {
    this.photoLibrary.requestAuthorization({ read: true, write: true }).then(() => {

      this.photoLibrary.getAlbums().then((albums) => {
        albums.forEach(album => {
          console.log(album.id);
          console.log(album.title);
        });
      }).catch((err) => {
        console.log('Albums' + err);
      });
    })
      .catch((err) => console.log('permissions weren\'t granted' + err));
  }

  itemTapped(event, libraryItem) {
    console.log(libraryItem);
  }


  goBack(): void{
    this.modalCtrl.dismiss();
  }



}
