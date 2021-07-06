import {Desk} from "./desk";
import {Color} from "./color";
import {ListCard} from "./ListCard";
import {Card} from "./card";
import {createRandomDesk} from "./createRandomDesk";
import {addFundation, game, isInOrder, NOCARD, startGame, topCard} from "./game";
import {listSuitCard} from "./listSuitCard";
import {addSuit} from "./addSuit";
import {draw} from "./draw";
let listCardSpades: ListCard
let listCardHeart: ListCard;
let desk: Card[];
describe('test solitaire', () => {

    beforeEach(() => {
        listCardSpades = {
            colorList: Color.SPADES,
            cards: []
        };

        listCardHeart = {
            colorList: Color.HEART,
            cards: []
        }


        desk = createRandomDesk()
    });


    it('should fondation be empty by default', () => {
        expect(topCard(listCardSpades).card).toEqual("")
    });
    it('should add ace to empty fondation', () => {

        addFundation(listCardSpades, {color: Color.SPADES, card: Desk.ACE, visible: true});
        expect(topCard(listCardSpades)).toEqual({card:Desk.ACE,color:Color.SPADES, visible: true})

    });
    it('should not add two too  empty fondation', () => {

        addFundation(listCardSpades, {color: Color.SPADES, card: Desk.TWO, visible: true});
        expect(topCard(listCardSpades)).toEqual({card:"",color:"", visible: false})

    });

    it('should add two One Ace   fondation', () => {

        addFundation(listCardSpades, {color: Color.SPADES, card: Desk.ACE, visible: true});
        addFundation(listCardSpades, {color: Color.SPADES, card: Desk.TWO, visible: true});
        expect(topCard(listCardSpades)).toEqual({card:Desk.TWO,color:Color.SPADES, visible: true})

    });

    it('should not add three  One Ace   fondation', () => {

        addFundation(listCardSpades, {color: Color.SPADES, card: Desk.ACE, visible: true});
        addFundation(listCardSpades, {color: Color.SPADES, card: Desk.THREE, visible: true});
        expect(topCard(listCardSpades)).toEqual({card:Desk.ACE,color:Color.SPADES, visible: true})

    });
    it('should not add two same card on  fondation', () => {

        addFundation(listCardSpades, {color: Color.SPADES, card: Desk.ACE, visible: true});
        addFundation(listCardSpades, {color: Color.SPADES, card: Desk.ACE, visible: true});


        expect(listCardSpades.cards.length).toEqual(1)

    });
    it('should  add three  One two and one   fondation', () => {

        addFundation(listCardSpades, {color: Color.SPADES, card: Desk.ACE, visible: true});
        addFundation(listCardSpades, {color: Color.SPADES, card: Desk.TWO, visible: true});
        addFundation(listCardSpades, {color: Color.SPADES, card: Desk.THREE, visible: true});
        expect(isInOrder(listCardSpades.cards)).toBeTruthy()
    });
    it('should  fondation is full of all card in order', () => {
        Object.values(Desk).map(card => addFundation(listCardSpades, {color: Color.SPADES, card: card, visible: true}))
        expect(isInOrder(listCardSpades.cards)).toBeTruthy()

    });
    it('should  Ace spade should not follow Two heart on fundation', () => {

        addFundation(listCardSpades, {color: Color.SPADES, card: Desk.ACE, visible: true});
        addFundation(listCardHeart, {color: Color.HEART, card: Desk.TWO, visible: true});
        expect(topCard(listCardSpades)).toEqual({card:Desk.ACE,color:Color.SPADES, visible: true})

    });
    it('should  suit be empty by default', () => {

        expect(topCard({cards: []})).toEqual(NOCARD)

    });
    it('should  place only a king on a empty suit ', () => {
        let suit: listSuitCard = {cards: []};
        let cardHeartKing = {color: Color.HEART, card: Desk.KING, visible: true}
        addSuit(suit, cardHeartKing)
        expect(topCard(suit)).toEqual({card:Desk.KING,color:Color.HEART, visible: true})

    });
    it('should not place all card on empty suit except King', () => {
        let suit: listSuitCard = {cards: []};
        let cardHeartThree = {color: Color.HEART, card: Desk.THREE, visible: true}
        addSuit(suit, cardHeartThree)
        expect(topCard(suit)).toEqual({card:"",color:"", visible: false})
    });

    it('should  create a suit listcard with one visible and 1 not visible', () => {
        let suit: listSuitCard = {cards: []};
        let cardOne: Card = {
            color: Object.values(Color)[Math.trunc(Math.random() * Object.values(Color).length)],
            card: Object.values(Desk)[Math.trunc(Math.random() ** Object.values(Desk).length)],
            visible: false
        }
        let cardTwo: Card = {
            color: Color.SPADES, card: Desk.EIGHT, visible: true
        }
        addSuit(suit, cardOne)
        addSuit(suit, cardTwo)
        expect(topCard(suit)).toEqual({card:Desk.EIGHT,color:Color.SPADES, visible: true})
        expect(cardTwo.visible).toBeTruthy()
        expect(cardOne.visible).toBeFalsy()

    });

    it('should  return the random card of suit2 when topcard suit2 is ace', () => {
        let suit2: listSuitCard = {cards: []};
        let cardOne = {
            color: Object.values(Color)[Math.trunc(Math.random() * Object.values(Color).length)],
            card: Object.values(Desk)[Math.trunc(Math.random() * Object.values(Desk).length)],
            visible: false
        }
        let cardTwo = {color: Color.HEART, card: Desk.ACE, visible: true}
        addSuit(suit2, cardOne)
        addSuit(suit2, cardTwo)
        game(suit2,listCardHeart)
        let cardtop = topCard(suit2)
        expect(cardtop.card).toEqual(cardOne.card)
        expect(cardtop.color).toEqual(cardOne.color)
    });
    it('should  return the random card of suit2 when topcard of suit2 can be add to fundation ', () => {
        addFundation(listCardSpades, {color: Color.SPADES, card: Desk.ACE, visible: true});
        addFundation(listCardSpades, {color: Color.SPADES, card: Desk.TWO, visible: true});
        addFundation(listCardSpades, {color: Color.SPADES, card: Desk.THREE, visible: true});
        let suit2: listSuitCard = {cards: []};
        let cardOne = {
            color: Object.values(Color)[Math.trunc(Math.random() * Object.values(Color).length)],
            card: Object.values(Desk)[Math.trunc(Math.random() * Object.values(Desk).length)],
            visible: false
        }
        let cardTwo = {color: Color.SPADES, card: Desk.FOUR, visible: true}
        addSuit(suit2, cardOne)
        addSuit(suit2, cardTwo)
        game(suit2,listCardSpades)
        let cardtop = topCard(suit2)
        expect(cardtop.card).toEqual(cardOne.card)
        expect(cardtop.color).toEqual(cardOne.color)
    });
    it('should  not return the random card of suit2 when topcard of suit2 cant be add to fundation ', () => {
        addFundation(listCardSpades, {color: Color.SPADES, card: Desk.ACE, visible: true});
        addFundation(listCardSpades, {color: Color.SPADES, card: Desk.TWO, visible: true});
        addFundation(listCardSpades, {color: Color.SPADES, card: Desk.THREE, visible: true});
        let suit2: listSuitCard = {cards: []};
        let cardOne = {
            color: Object.values(Color)[Math.trunc(Math.random() * Object.values(Color).length)],
            card: Object.values(Desk)[Math.trunc(Math.random() * Object.values(Desk).length)],
            visible: false
        }
        let cardTwo = {color: Color.SPADES, card: Desk.FIVE, visible: true}
        addSuit(suit2, cardOne)
        addSuit(suit2, cardTwo)
        game(suit2,listCardSpades)
        let cardtop = topCard(suit2)
        expect(cardtop.card).toEqual(cardTwo.card)
        expect(cardtop.color).toEqual(cardTwo.color)
    });

    //create table of seven suit
    //test suit alternate color
    it('should create the desk of 52 card', () => {

        expect(desk.length).toEqual(52)
    });
    it('should  draw a card in a shuffle desk', () => {

        let cardDraw = draw(desk)
        desk=cardDraw.desk
        expect(desk.length).toEqual(51)
        expect(desk.find(car => car === cardDraw.cardDraw)).toBeFalsy()
    });
    it('should create seven table suit of the game', function () {
        let {table} = startGame(desk);
        expect(desk.length).toEqual(24)
        expect(table[6].cards[6].visible).toEqual(true)
    });
    it('should game card on suit on table card when is not the same color', function () {
        let suit2: listSuitCard = {cards: []};
        let cardOne: Card = {
            color: Color.DIAMONDS,
            card: Desk.FOUR,
            visible: true
        }
        suit2.cards.push(cardOne)
        let cardTwo: Card = {
            color: Color.SPADES,
            card: Desk.THREE,
            visible: true
        }
        addSuit(suit2, cardTwo)

        expect(topCard(suit2)).toEqual(cardTwo)
    });

    it('should not game card on suit on table card when is the same color ', function () {
        let suit2: listSuitCard = {cards: []};
        let cardOne: Card = {
            color: Color.DIAMONDS,
            card: Desk.FOUR,
            visible: true
        }
        suit2.cards.push(cardOne)
        let cardTwo: Card = {
            color: Color.HEART,
            card: Desk.THREE,
            visible: true
        }
        addSuit(suit2, cardTwo)

        expect(topCard(suit2)).not.toEqual(cardTwo)
    });
    it('should  game card on suit on table card when card is inferior ', function () {
        let suit2: listSuitCard = {cards: []};
        let cardOne: Card = {
            color: Color.DIAMONDS,
            card: Desk.FOUR,
            visible: true
        }
        suit2.cards.push(cardOne)
        let cardTwo: Card = {
            color: Color.SPADES,
            card: Desk.THREE,
            visible: true
        }
        addSuit(suit2, cardTwo)

        expect(topCard(suit2)).toEqual(cardTwo)
    });
    it('should  not game card on suit on table card when card is not inferior ', function () {
        let suit2: listSuitCard = {cards: []};
        let cardOne: Card = {
            color: Color.DIAMONDS,
            card: Desk.FOUR,
            visible: true
        }
        suit2.cards.push(cardOne)
        let cardTwo: Card = {
            color: Color.SPADES,
            card: Desk.FIVE,
            visible: true
        }
        addSuit(suit2, cardTwo)

        expect(topCard(suit2)).not.toEqual(cardTwo)
    });
    it('should make the suit card visible when the suit is not covered by a visible card ', function () {
        let suit2: listSuitCard = {cards: []};
        let cardOne: Card = {
            color: Color.DIAMONDS,
            card: Desk.FOUR,
            visible: false
        }
        suit2.cards.push(cardOne)
        let cardTwo: Card = {
            color: Color.SPADES,
            card: Desk.FIVE,
            visible: false
        }
        suit2.cards.push(cardTwo)
        let cardThree: Card = {
            color: Color.SPADES,
            card: Desk.ACE,
            visible: true
        }
        suit2.cards.push(cardThree)
        game(suit2,listCardSpades)

        expect(topCard(listCardSpades).card).toEqual(Desk.ACE)
        expect(topCard(suit2).visible).toEqual(true)
    });


});
