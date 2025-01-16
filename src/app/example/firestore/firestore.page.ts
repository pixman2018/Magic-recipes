import { Component, inject, OnInit, signal } from '@angular/core';
import { getDownloadURL, UploadTask } from '@angular/fire/storage';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { HelperService } from 'src/app/shared/services/helperService/helper.service';

@Component({
  selector: 'app-firestore',
  templateUrl: './firestore.page.html',
  styleUrls: ['./firestore.page.scss'],
})
export class FirestorePage implements OnInit {

  protected progressNo = signal<number>(0);
  protected iconUrl = signal<string>('');
  private readonly _strorage = inject(Storage);
  private readonly _helperSErvice = inject(HelperService);

  constructor() {}

  ngOnInit() {}

  protected onUploadThumbnail(event: any) {
    if (! event) {
      console.log('not file');
      return;
    }
    var metadata = {
      cacheControl: 'public,max-age=2592000,public',
    }
    const file: File = event.target.files[0];
    const courseId = this._helperSErvice.generateToken(12); // id from the document
    const filePath: string = `courses/${courseId}/${file.name}`;


    const storageRef = ref(this._strorage, filePath);
    const uploadTask: UploadTask = uploadBytesResumable(
      storageRef,
      file,
      metadata
    );

   uploadTask.on(
      'state_changed',
      (snapshot) => {
        this.progressNo.set( (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is runninng');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            console.log('User doesn`t have permission to access the object');
            break;
          case 'storage/canceled':
            console.log('User canceled the upload');
            break;
          case 'storage/unknown':
            console.log('Unknown error occurred, inspect error.serverResponse');
            break;
        }
      },
      () => {
        //  Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURLRef) => {
          this.iconUrl.set(downloadURLRef);
          // console.log('File available at', downloadURLRef);
        });
      }
    );
  }

  // multiple
  // protected onUploadThumbnail(input: HTMLInputElement) {
  //   // https://firebase.google.com/docs/storage/web/upload-files?hl=de
  // https://firebase.google.com/docs/storage/web/start?hl=de#web
  // https://github.com/angular/angularfire/blob/main/docs/storage.md
  //   if (!input) {
  //     return;
  //   }

  //   const files: FileList | null = input.files;
  //   if (files) {
  //     for (let i = 0; i < files.length; i++) {
  //       const file: File = files[i];
  //       console.log('file', file);
  //       if (file) {
  //         const metadata = {
  //           contentType: 'image/jpeg',
  //         };
  //         const storageRef = ref(this._strorage, file.name);

  //         const uploadTask: UploadTask = uploadBytesResumable(
  //           storageRef,
  //           file,
  //           metadata
  //         );

  //         uploadTask.on(
  //           'state_changed',
  //           (snapshot) => {
  //             const progress =
  //               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //             console.log('Uploadis ' + progress + '% done');
  //             switch (snapshot.state) {
  //               case 'paused':
  //                 console.log('Upload is paused');
  //                 break;
  //               case 'running':
  //                 console.log('Upload is runninng');
  //                 break;
  //             }
  //           },
  //           (error) => {
  //             switch (error.code) {
  //               case 'storage/unauthorized':
  //                 console.log(
  //                   'User doesn`t have permission to access the object'
  //                 );
  //                 break;
  //               case 'storage/canceled':
  //                 console.log('User canceled the upload');
  //                 break;
  //               case 'storage/unknown':
  //                 console.log(
  //                   'Unknown error occurred, inspect error.serverResponse'
  //                 );
  //                 break;
  //             }
  //           },
  //           () => {
  //             // Upload completed successfully, now we can get the download URL
  //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURLRef) => {
  //               console.log('File available at', downloadURLRef);
  //             });
  //           } // end Observable
  //         ); // end on
  //       } // end if 'file'
  //     } // end for
  //   } // end if 'files'
  // }
}
// const courseId = 'ewgdf11ffg4'; // id from the document
// const fileRef: File = event.target.files[0];
//     // create in storage: courses/courseId/file
//     const filePath: string = `courses/${courseId}${fileRef.name}`;

//     const task = this._storage.upload(filePath, fileRef, {
//       cacheControl: 'max-age=2592000, public'
//     });

//     task.snapshotChanges()
//       .subscribe();
//     console.log('file', fileRef.name);

// const file: File | undefined = input.files?.[0];
