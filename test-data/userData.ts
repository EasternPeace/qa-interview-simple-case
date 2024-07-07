import { faker } from '@faker-js/faker';

export const existingUsers = [
  {
    email: 'test1@mail.com',
    password: 'testPassword!',
    firstName: 'Test1',
    lastName: 'Testsson1',
  },
  {
    email: 'test2@mail.com',
    password: 'testPassword!',
    firstName: 'Test2',
    lastName: 'Testsson2',
  },
  {
    email: 'test3@mail.com',
    password: 'testPassword!',
    firstName: 'Test3',
    lastName: 'Testsson3',
  },
] as const

export function generateUser() {
  return {
    email: faker.internet.email(),
    password: faker.string.alphanumeric(9),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };
}