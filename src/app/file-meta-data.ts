export class FileMetaData {
  id : string ='';
  name : string = '';
  size : number = 0;
  file : File;
  url : Array<string> =[];

  constructor(file : File) {
    this.file = file;
  }

}
