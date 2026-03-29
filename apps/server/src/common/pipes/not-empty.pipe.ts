import { ForbiddenException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class NotEmptyPipe implements PipeTransform {
  transform(value: any) {
    if (!value || typeof value !== 'object') {
      throw new ForbiddenException('Payload must be an object')
    }

    const fields = Object.values(value)
    const hasValue = fields.some(
      (val) => val !== undefined && val !== null && val !== ''
    )
    if (!hasValue) {
      throw new ForbiddenException('At least one field must be provided for update')
    }

    return value
  }
}