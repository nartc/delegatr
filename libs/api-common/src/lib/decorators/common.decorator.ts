import { applyDecorators, Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiOperationOptions,
  ApiTags,
} from '@nestjs/swagger';
import { plugin } from '@typegoose/typegoose';
import * as autoPopulate from 'mongoose-autopopulate';
import * as leanVirtuals from 'mongoose-lean-virtuals';
import { ApiException } from '../api-exception';
import { PermissionPrivilege } from '../api-permissions';
import { PermissionGuard } from '../guards/permission.guard';
import { Permissions } from './permissions.decorator';

export const ApiController = (prefix: string, tag: string) => {
  return applyDecorators(
    Controller(prefix),
    ApiTags(tag),
    ApiNotFoundResponse({ type: ApiException, description: 'Not found' }),
    ApiBadRequestResponse({ type: ApiException, description: 'Bad Request' }),
    ApiInternalServerErrorResponse({
      type: ApiException,
      description: 'Internal Server Error',
    })
  );
};

export const ApiOperationId = (options?: ApiOperationOptions) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const controllerName = target.constructor.name;
    const operationId = `${controllerName.substr(
      0,
      controllerName.indexOf('Controller')
    )}_${propertyKey}`;

    ApiOperation({
      ...options,
      operationId,
    })(target, propertyKey, descriptor);
  };
};

export const UseAuthGuards = (permissions?: {
  [key: string]: PermissionPrivilege;
}) => {
  if (permissions) {
    return applyDecorators(
      UseGuards(AuthGuard(), PermissionGuard),
      Permissions(permissions)
    );
  }

  return applyDecorators(UseGuards(AuthGuard()));
};

export const useMongoosePlugins = () => {
  return applyDecorators(plugin(autoPopulate), plugin(leanVirtuals));
};
