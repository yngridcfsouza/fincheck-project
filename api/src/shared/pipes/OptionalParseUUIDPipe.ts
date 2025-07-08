import { ArgumentMetadata, ParseUUIDPipe, PipeTransform, Injectable } from "@nestjs/common";

@Injectable()
export class OptionalParseUUIDPipe implements PipeTransform {
    private readonly parseUUIDParse = new ParseUUIDPipe();

    async transform(value: string, metadata: ArgumentMetadata): Promise<string | undefined> {
        if (typeof value === 'undefined') {
            return undefined;
        }

        return this.parseUUIDParse.transform(value, metadata);
    }
}