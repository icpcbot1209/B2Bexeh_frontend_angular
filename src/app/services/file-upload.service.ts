import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {}

  async pushFileToStorage(file: File, dirPath: string, fileName: string) {
    const fullPath = `${dirPath}/${fileName}`;
    const storageRef = this.storage.ref(fullPath);

    await this.storage.upload(fullPath, file);
    const downloadURL = await storageRef.getDownloadURL().toPromise();
    return downloadURL;
  }

  // private saveFileData(fileUpload: FileUpload): void {
  //   this.db.list(this.basePath).push(fileUpload);
  // }

  // getFiles(numberItems): AngularFireList<FileUpload> {
  //   return this.db.list(this.basePath, (ref) => ref.limitToLast(numberItems));
  // }

  // deleteFile(fileUpload: FileUpload): void {
  //   this.deleteFileDatabase(fileUpload.key)
  //     .then(() => {
  //       this.deleteFileStorage(fileUpload.name);
  //     })
  //     .catch((error) => console.log(error));
  // }

  // private deleteFileDatabase(key: string): Promise<void> {
  //   return this.db.list(this.basePath).remove(key);
  // }

  // private deleteFileStorage(name: string): void {
  //   const storageRef = this.storage.ref(this.basePath);
  //   storageRef.child(name).delete();
  // }
}

export const makeFileName = (file: File, email: string) => {
  let name = email.toLowerCase().split(' ').join('-').split('@').join('-');
  const ext = MIME_TYPE_MAP[file.type];
  name = name + '-' + Date.now() + '.' + ext;
  return name;
};

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'application/pdf': 'pdf',
};
