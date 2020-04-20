import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { buildSchema, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { AutoMap } from 'nestjsx-automapper';

export abstract class BaseModel {
  @prop()
  @AutoMap()
  createdAt?: Date;
  @prop()
  @AutoMap()
  updatedAt?: Date;
  @prop({ required: true, default: true, index: true })
  @AutoMap()
  isActive: boolean;
  @AutoMap()
  id?: string;

  static get schema(): Schema {
    return buildSchema(<any>this, {
      timestamps: true,
      toJSON: {
        getters: true,
        virtuals: true,
      },
      id: true,
    });
  }

  static get modelName(): string {
    return this.name;
  }
}

export abstract class BaseVm {
  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @AutoMap()
  createdAt?: Date;
  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @AutoMap()
  updatedAt?: Date;
  @ApiPropertyOptional()
  @AutoMap()
  id?: string;
  @ApiProperty()
  @AutoMap()
  isActive: boolean;
}
