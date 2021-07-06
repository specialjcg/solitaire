import {Card} from "./card";
import {Desk} from "./desk";

export function getIndexOfCard(card: Card): number {

    let i: number
    for (i = 0; i < Object.values(Desk).length; i++) {
        if (Object.values(Desk)[i] === card.card) {
            break
        }
    }
    return i;
}
