import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { PrismaService } from '../prisma.service';

@Injectable()
@ValidatorConstraint({ name: 'unique', async: true })
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}

  public async validate<E>(value: string, args: UniqueValidationArguments<E>) {
    const [entity, findCondition = args.property] = args.constraints;
    const fieldName = (findCondition || args.property) as string;
    const modelName = (entity as string).toLowerCase();
    return (
      (await this.prisma[modelName].count({
        where: { [fieldName]: value },
      })) <= 0
    );
  }

  defaultMessage(args: ValidationArguments) {
    const [modelName] = args.constraints;
    const entity = modelName || 'Entity';
    return `${entity} with the same ${args.property} already exists`;
  }
}

type UniqueValidationConstraints<E> = [string, keyof E];
interface UniqueValidationArguments<E> extends ValidationArguments {
  constraints: UniqueValidationConstraints<E>;
}

export function Unique<E>(
  constraints: Partial<UniqueValidationConstraints<E>>,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints,
      validator: UniqueValidator,
    });
  };
}
