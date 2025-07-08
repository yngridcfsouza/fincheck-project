import {
  ArgumentMetadata,
  ParseEnumPipe,
  PipeTransform,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class OptionalParseEnumPipe<T = any> implements PipeTransform {
  private readonly parseEnumPipe: PipeTransform;

  constructor(enumType: object) {
    this.parseEnumPipe = new ParseEnumPipe(enumType);
  }

  async transform(
    value: T,
    metadata: ArgumentMetadata
  ): Promise<T | undefined> {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    return this.parseEnumPipe.transform(value, metadata);
  }
}