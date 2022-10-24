import { ReadStream, createWriteStream } from 'fs';
import { Bucket, Storage } from '@google-cloud/storage';
import { FileUpload as GqlFile } from 'graphql-upload';
import { File, GetSignedUrlConfig } from '@google-cloud/storage/build/src/file';
import { v4 as uuidv4 } from 'uuid';

import { isCloudStorageEnabled } from 'core/feature-flags-checkers';
import FileUploaded from './file-uploaded';

function base64MimeType(encoded: string | unknown) {
  let result = null;

  if (typeof encoded !== 'string') {
    return result;
  }

  const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

  if (mime && mime.length) {
    result = mime[1];
  }

  return result;
}

class Upload {
  bucketName: string;

  storage: Storage;

  bucket: Bucket;

  constructor() {
    if (!process.env.GCS_BUCKET_NAME) {
      throw new Error('set GCS_BUCKET_NAME in .env file');
    }

    this.bucketName = process.env.GCS_BUCKET_NAME;
    this.storage = new Storage({ keyFilename: 'ds-sa.json' });
    this.bucket = this.storage.bucket(this.bucketName);
  }

  _generateUniqueName(filename: string): string {
    return `${uuidv4()}-${filename}`;
  }

  async uploadFile(rawfile: Promise<GqlFile>): Promise<FileUploaded> {
    const { createReadStream, filename } = await rawfile;
    const isCSEnabled = await isCloudStorageEnabled();
    const stream = createReadStream();
    if (isCSEnabled) {
      const path = this._generateUniqueName(filename);
      const file = this.bucket.file(path);
      await this._upload(stream, file);
      await file.makePublic();
      return {
        link: file.metadata.mediaLink,
        name: path,
      };
    } else {
      const storedFileName = this._generateUniqueName(filename);
      const storedFilePath = `./uploads/${storedFileName}`;
      const storedFileUrl = `${process.env.API_URL?.slice(0, -4)}/uploads/${storedFileName}`;
      await this._internalUpload(stream, storedFilePath);
      return {
        link: encodeURI(storedFileUrl),
        name: storedFileName,
      };
    }
  }

  async uploadBase64File(base64String: string, filename: string) {
    // const { createReadStream, filename } = await rawfile;
    const path = this._generateUniqueName(filename);
    const file = this.bucket.file(path);

    const fileOptions = {
      resumable: false,
      metadata: { contentType: base64MimeType(base64String) || 'image/png' },
      validation: false,
    };

    const base64EncodedString = base64String.replace(/^data:\w+\/\w+;base64,/, '');
    const fileBuffer = Buffer.from(base64EncodedString, 'base64');
    await file.save(fileBuffer, fileOptions);
    // file.download({});
    // await file.makePublic();
    return path;
  }

  async getSignedUrl(filename: string): Promise<string> {
    const options: GetSignedUrlConfig = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };
    const [url] = await this.bucket.file(filename).getSignedUrl(options);
    return url;
  }

  async _upload(stream: ReadStream, file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      stream
        .pipe(file.createWriteStream())
        .on('error', function () {
          reject();
        })
        .on('finish', function () {
          resolve();
        });
    });
  }

  async _internalUpload(stream: ReadStream, url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      stream
        .pipe(createWriteStream(url))
        .on('error', function () {
          reject();
        })
        .on('finish', function () {
          resolve();
        });
    });
  }

  async deleteFile(path: string): Promise<void> {
    await this.bucket.file(path).delete();
  }
}

export default new Upload();
