import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { isInt, isUUID } from 'class-validator'

@Injectable()
export class IdPipe implements PipeTransform {
  transform(value: any) {
    const isValidUUID = isUUID(value, '4')
    const isAutoId = !isNaN(parseInt(value)) && isInt(parseInt(value)) && parseInt(value) > 0

    if (!isValidUUID && !isAutoId)
      throw new BadRequestException(`Невалидный формат ID: "${value}". Ожидался UUID или целочисленный.`)

    return isValidUUID ? value : parseInt(value)
  }
}