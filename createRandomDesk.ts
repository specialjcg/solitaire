import {Color} from "./color";
import {Desk} from "./desk";
import {Card} from "./card";
import {shuffle} from "./shuffle";

export function createRandomDesk() {
    let desk: Card[] = [];
    Object.values(Color).map(col => {
        Object.values(Desk).map(val => desk.push({card: val, color: col, visible: false}))
    })
    shuffle(desk);

    return desk
}
