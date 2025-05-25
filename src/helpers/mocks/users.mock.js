import { faker } from "@faker-js/faker";
faker.locale = 'es';

const createMockUser = () => {
    const roles = ["USER", "ADMIN", "PREM"];
    const name = faker.internet.username().toLowerCase();
    const date = faker.date.birthdate();
    const city = faker.location.city();
    const email = name + "@coder.com.ar";
    const password = "hola1234";
    const avatar = faker.image.urlLoremFlickr({
        category: "nature",
        width: 360,
        height: 360,
    });
    const role = roles[faker.number.int({ min: 0, max: 2 })];
    return { name, date, city, email, password, avatar, role };
};

//console.log(createMockUser());
export default createMockUser;
