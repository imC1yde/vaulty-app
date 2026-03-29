import { InputType } from '@nestjs/graphql'
import { PaginationInput } from '@src/common/strategies/pagination-input.strategy'

@InputType()
export class GetAllGamesInput extends PaginationInput() {}