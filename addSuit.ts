import {listSuitCard} from "./listSuitCard";
import {Card} from "./card";
import {Desk} from "./desk";
import {colorOf} from "./game";
import {getIndexOfCard} from "./getIndexOfCard";

export function addSuit(suit: listSuitCard, card: Card) {

    if (suit.cards.length === 0 && card.card === Desk.KING) {
        suit.cards = [...suit.cards, card]
    } else if (!card.visible) {
        suit.cards = [...suit.cards, card]
    } else if (suit.cards.length > 0 && card.visible && suit.cards.slice(-1)[0].visible &&
        colorOf(suit.cards.slice(-1)[0].color) !== colorOf(card.color) &&
        getIndexOfCard(suit.cards.slice(-1)[0]) > getIndexOfCard(card)
    ) {
        suit.cards = [...suit.cards, card]
    } else if (suit.cards.length > 0 && card.visible && !suit.cards.slice(-1)[0].visible) {
        suit.cards = [...suit.cards, card]

    }
}
