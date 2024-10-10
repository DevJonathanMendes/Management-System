import { faker } from "@faker-js/faker";

export default function createFakeUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = faker.internet.userName({ firstName, lastName });
  const email = faker.internet.email({ firstName, lastName });

  return {
    firstName,
    lastName,
    username,
    email,
  };
}
