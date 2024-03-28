export function *test() {
    yield 1;
    yield 2;
    yield 3;
    return 4;
}

const gen = test();

for (const value of gen) {
    console.log(value);
}