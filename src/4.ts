class Key {
    private signature: string;
    constructor() {
        this.signature = `#${Math.random().toFixed(7).slice(2)}`;
    }
    getSignature(): string {
        return this.signature;
    }
}

class Person {
    private key: Key;
    constructor(input: Key) {
        this.key = input;
    }
    getKey(): Key {
        return this.key;
    }
}

abstract class House {
    protected door: boolean;
    protected key: Key;
    protected tenants: Person[];
    constructor(key: Key) {
        this.key = key;
        this.door = false;
        this.tenants = [];
    }
    comeIn(person: Person): void {
        if (this.door) {
            this.tenants.push(person);
            console.log(`A person with ${person.getKey().getSignature()} key is entering the house...`);
        } else {
            console.log("The door is locked! Cannot enter!")
        }
    }
    abstract openDoor(key: Key): void;
}

class MyHouse extends House {
    constructor(key: Key) {
        super(key);
    }
    openDoor(key: Key): void {
        console.log(`Using key ${key.getSignature()}`);
        if (key === this.key) {
            this.door = true;
            console.log("Door is opening...");
        } else {
            console.log("Wrong key!")
        }
    }
}

const key = new Key();
const anotherKey = new Key();

const house = new MyHouse(key);

const neighbor = new Person(anotherKey);
const tenant = new Person(key);

house.openDoor(neighbor.getKey());
house.comeIn(neighbor);
house.openDoor(tenant.getKey());
house.comeIn(tenant);
house.comeIn(neighbor);

export {};