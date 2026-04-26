import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class NotEmptyPipe implements PipeTransform {
  transform(value: any) {
    if (!value || typeof value !== 'object') throw new BadRequestException('Тело запроса должно быть объектом')

    const fields = Object.values(value)
    const hasValue = fields.some(
      (val) => val !== undefined && val !== null && val !== ''
    )
    if (!hasValue) throw new BadRequestException('Как минимум одно поле должно быть заполнено')

    return value
  }
}