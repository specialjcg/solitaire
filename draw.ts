import {Card} from "./card";

export const draw = (desk: Card[]) => {
    let index = Math.floor(Math.random() * desk.length)
    let cardDraw = desk[index];
    desk.splice(index, 1)
    return {cardDraw, desk};
};
