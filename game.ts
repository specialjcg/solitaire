import {Desk} from "./desk";
import {Color} from "./color";
import {Card} from "./card";
import {listSuitCard} from "./listSuitCard";
import {ListCard} from "./ListCard";
import {draw} from "./draw";


export const NOCARD = {card: "", color: "", visible: false};
export const topCard = (listCard: ListCard | listSuitCard): Card => {
    if (listCard === undefined || !listCard.cards.length) {
        return NOCARD
    }
    return listCard.cards.slice(-1)[0];

}

export const addFundation = (listCard: ListCard, card: Card) => {
    Object.values(Desk).map((cardEnum, index) => {
        if (card.card === cardEnum && listCard.cards.length === index) listCard.cards.push(card)
    })

}

export const isInOrder = (listCard: Card[]): boolean => {

    return listCard.reduce((acc, listCard, index) => listCard.card === Object.values(Desk)[index], true).valueOf();

}


export const colorOf = (color: string): boolean => !(color === Color.HEART || color === Color.DIAMONDS);

function addCardToFundation(card: Card, suit: listSuitCard,colorToAdd:Color,listCardColor:ListCard) {
    if (card.color === colorToAdd) {
        addFundation(listCardColor, card)
        let cardTopFundationHeart: Card = topCard(listCardColor)
        if (card.color === cardTopFundationHeart.color && card.card === cardTopFundationHeart.card) {
            suit.cards.pop()
            suit.cards.slice(-1)[0].visible=true

        }
    }

}

export function game(suit: listSuitCard,listCard:ListCard) {

    let card: Card = topCard(suit)
    addCardToFundation(card, suit,Color.HEART, listCard);
    addCardToFundation(card, suit,Color.SPADES, listCard);
    addCardToFundation(card, suit,Color.CLUBS, listCard);
    addCardToFundation(card, suit,Color.DIAMONDS, listCard);

}



export function startGame(desk: Card[]) {
    let table: listSuitCard[] = [];
    for (let i = 0; i < 7; i++) {
        let suit: listSuitCard = {cards: []};
        for (let j = 0; j <= i; j++) {
            let newdesk=draw(desk)
            suit.cards.push(newdesk.cardDraw)
            desk=newdesk.desk


            if (j === i) {
                suit.cards[j].visible = true;

            }

        }
        table.push(suit)
    }
    return {table};
}
