import { Controller, Get, Post } from '@nestjs/common';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  personRankings() {
    return this.personService.getPersonRanking();
  }

  @Post()
  addPersonRanking() {
    return this.personService.addPersonRanking();
  }
}
