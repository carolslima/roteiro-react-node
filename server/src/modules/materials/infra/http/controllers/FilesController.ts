import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';
import fs from 'fs';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';

import CreateFileService from '@modules/materials/services/CreateFileService';
import DeleteFileService from '@modules/materials/services/DeleteFileService';
import ListFilesService from '@modules/materials/services/ListFilesService';
import ImportFileService from '@modules/materials/services/ImportFileService';

class FilesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.user;

    const listFiles = container.resolve(ListFilesService);

    const files = await listFiles.execute(provider_id);

    return response.json(classToClass(files));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id: user_id_create, provider_id } = request.user;
    const { schedule } = request.body;
    const { file } = request;
    const { originalname: name, filename: path, size } = file;

    if (file.path.split('.')[1] !== 'txt') {
      await fs.promises.unlink(file.path);

      throw new AppError('File extension is not authorized');
    }

    const createFile = container.resolve(CreateFileService);

    const parsedSchedule = parseISO(schedule);

    const fileImported = await createFile.execute({
      name,
      path,
      size,
      user_id_create,
      provider_id,
      schedule: parsedSchedule,
    });

    const file_id = fileImported.id;

    const importFiles = container.resolve(ImportFileService);

    const importedMaterials = await importFiles.execute({
      fileImport: file,
      file_id,
      provider_id,
      user_id: user_id_create,
      schedule: parsedSchedule,
    });

    if (!importedMaterials) {
      const deleteFile = container.resolve(DeleteFileService);

      await deleteFile.execute({ file_id, provider_id });
    }

    return response.status(201).json(fileImported);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { provider_id, role } = request.user;
    const { file_id } = request.params;

    if (Number(role) !== 3) {
      throw new AppError('Unauthorized', 401);
    }

    const deleteFile = container.resolve(DeleteFileService);

    await deleteFile.execute({ file_id, provider_id });

    return response.status(204).send();
  }
}

export default FilesController;
