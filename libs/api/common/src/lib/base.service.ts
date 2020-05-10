import { BaseModel, BaseRepository } from '@delegatr/api/common';
import { DocumentType } from '@typegoose/typegoose';

export abstract class BaseService<TModel extends BaseModel> {
  protected repository: BaseRepository<TModel>;

  protected constructor(repository: BaseRepository<TModel>) {
    this.repository = repository;
  }

  createModel(doc?: Partial<TModel>): TModel {
    return this.repository.createModel(doc);
  }

  async create(item: TModel): Promise<DocumentType<TModel>> {
    return await this.repository.create(item);
  }
}
