import { CloudFiles } from 'entities';

export class CloudFileService {
  insert = async (filename: string, url?: string): Promise<CloudFiles> => {
    const file = CloudFiles.create({
      fileName: filename,
      url,
    });
    const saved = await file.save();
    return saved;
  };
}

export default new CloudFileService();
