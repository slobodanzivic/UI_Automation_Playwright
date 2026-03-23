import { faker } from '@faker-js/faker'

export class RandomDataProvider {


    //generate random first name
    static getRandomFirstName(): string {
        return faker.person.firstName();
    }

    //generate random last name
    static getRandomLastName(): string {
        return faker.person.lastName();
    }

    //generate random email
    static getRandomEmail(): string {
        return faker.internet.email();
    }

    //generate random telephone number
    static getRandomTelephone(): string {
        const randomPart = faker.number.int({ min: 0, max: 9_999_999 })
            .toString()
            .padStart(7, '0');

        return `064${randomPart}`;
    }

    //generate random password
    static getRandomPassword(): string {
        return faker.internet.password();
    }

    static getShortRandomPassword(): string {
        return faker.internet.password({ length: 3 });
    }


    static getLongRandomPassword(): string {
        return faker.internet.password({ length: 21 });
    }

    static getMinLengthRandomPassword(): string {
        return faker.internet.password({ length: 4 });
    }

    static getMaxLengthRandomPassword(): string {
        return faker.internet.password({ length: 20 });
    }

    static getMismatchedRandomConfirmPassword(): string {
        return faker.internet.password({ length: 8 });
    }


}