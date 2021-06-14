// import { In } from 'typeorm';
import { injectable, inject } from 'tsyringe';
import fs from 'fs';
import { format } from 'date-fns';

import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';
import ISignalsRepository from '@modules/signals/repositories/ISignalsRepository';
import ICacheMaterial from '@shared/container/providers/CacheMaterial/models/ICacheMaterial';
import ICacheFile from '@shared/container/providers/CacheFile/models/ICacheFile';

import Signal from '@modules/signals/infra/typeorm/entities/Signal';
import Material from '@modules/materials/infra/typeorm/entities/Material';

interface IRequest {
  fileImport: any;
  schedule: Date;
  file_id: string;
  user_id: string;
  provider_id: string;
}

interface IMaterialFile {
  cm?: number;
  title?: string;
  duration?: number;
  type?: string;
  client?: string;
  signal_id?: string;
  position?: string;
  program?: string;
  status: boolean;
  blank: boolean;
  user_id_create: string;
  user_id_update: string;
  provider_id: string;
  schedule: Date;
}

@injectable()
class ImportFileTXTService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,

    @inject('SignalsRepository')
    private signalsRepository: ISignalsRepository,

    @inject('CacheMaterial')
    private cacheMaterial: ICacheMaterial,

    @inject('CacheFile')
    private cacheFile: ICacheFile,
  ) {}

  async execute({
    fileImport,
    schedule,
    file_id,
    user_id,
    provider_id,
  }: IRequest): Promise<Material[]> {
    // Start with time line
    const materials: IMaterialFile[] = [
      {
        cm: Number(0),
        title: String(''),
        blank: Boolean(true),
        status: Boolean(true),
        duration: Number(0),
        type: String(''),
        client: String(''),
        position: String(''),
        program: String(''),
        user_id_create: user_id,
        user_id_update: user_id,
        provider_id,
        schedule: Object(schedule),
      },
    ];
    const signals: string[] = [];

    fs.readFile(fileImport.path, 'utf8', (errors, data) => {
      const lines = data.split(/\r?\n/);

      for (let i = 0; i < lines.length; i += 1) {
        const material = {
          cm: Number(lines[i].substr(2, 6)),
          title: String(lines[i].substr(68, 30).trim()),
          duration: Number(lines[i].substr(99, 3)),
          type: String(lines[i].substr(102, 2)),
          client: String(lines[i].substr(105, 150).trim()),
          signal: String(lines[i].substr(321, 1)),
          position: String(lines[i].substr(330, 2)),
          program: String(lines[i].substr(332, 32).trim()),
          status: Boolean(true),
          blank: Boolean(false),
          user_id_create: user_id,
          user_id_update: user_id,
          provider_id,
          schedule: Object(schedule),
        };

        signals.push(lines[i].substr(321, 1));

        // Create time line if change next PT or IP
        if (i > 0) {
          if (
            materials[materials.length - 1].position !== material.position &&
            material.position !== '' &&
            material.position !== null &&
            material.position !== undefined
          ) {
            materials.push({
              cm: Number(0),
              title: String(''),
              blank: Boolean(true),
              status: Boolean(true),
              duration: Number(0),
              type: String(''),
              client: String(''),
              position: String(''),
              program: String(''),
              user_id_create: user_id,
              user_id_update: user_id,
              provider_id,
              schedule: Object(schedule),
            });
          } else if (
            materials[materials.length - 1].program !== material.program &&
            material.program !== '' &&
            material.program !== null &&
            material.program !== undefined
          ) {
            materials.push({
              cm: Number(0),
              title: String(''),
              blank: Boolean(true),
              status: Boolean(true),
              duration: Number(0),
              type: String(''),
              client: String(''),
              position: String(''),
              program: String(''),
              user_id_create: user_id,
              user_id_update: user_id,
              provider_id,
              schedule: Object(schedule),
            });
          }
        }

        // Add material line on array materials
        materials.push(material);
      }
    });

    const getAllSignals = await this.signalsRepository.findAllSignals();

    const existentSignalsTypes = getAllSignals.map(
      (signal: Signal) => signal.type,
    );

    const signalTypeToAdd = signals
      .filter(signal => !existentSignalsTypes.includes(signal))
      .filter((value, index, self) => self.indexOf(value) === index);

    const addSignal = signalTypeToAdd.map(type => ({
      name: type,
      type,
    }));

    const createdSignals = await this.signalsRepository.createArray(addSignal);

    const signalsImplemented = [createdSignals, ...getAllSignals];

    const materialsArray = materials.map((material, index) => ({
      cm: Number(material.cm),
      title: String(material.title),
      duration: Number(material.duration),
      type: String(material.type),
      client: String(material.client),
      position: String(material.position),
      program: String(material.program),
      status: Boolean(material.status),
      blank: Boolean(material.blank),
      user_id_create: material.user_id_create,
      user_id_update: material.user_id_update,
      provider_id: material.provider_id,
      schedule: Object(material.schedule),
      signal_id: signalsImplemented.find(
        signal => signal.type === material.signal,
      ).id,
      list_position: Number(index),
      file_id,
      include: Boolean(false),
    }));

    const createdMaterials = this.materialsRepository.create(materialsArray);

    await this.cacheMaterial.invalidate(
      `provider-materials:${provider_id}:${format(schedule, 'yyyy-M-d')}`,
    );

    await this.cacheMaterial.invalidate(
      `provider-checklist:${provider_id}:${format(schedule, 'yyyy-M-d')}`,
    );

    await this.cacheMaterial.invalidate(
      `provider-paralelas:${provider_id}:${format(schedule, 'yyyy-M-d')}`,
    );

    await this.cacheFile.invalidate(`provider-files:${provider_id}`);

    return createdMaterials;
  }
}

export default ImportFileTXTService;
