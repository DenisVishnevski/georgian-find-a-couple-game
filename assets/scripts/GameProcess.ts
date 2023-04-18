import { _decorator, Component, Node } from 'cc';
import { Card } from './Card';
import { Counter } from './Counter';
const { ccclass, property } = _decorator;

@ccclass('GameProcess')
export class GameProcess extends Component {
    @property({type: Counter})
    private counter: Counter = null

    private isFree: boolean = true

    private firstCard: Card = null;
    private secondCard: Card = null;

    public getProcessStatus(): boolean {
        return this.isFree
    }

    public cardHandler(card: Card): void {
        this.setCard(card);

        if (this.firstCard !== null && this.secondCard !== null) {
            this.isFree = false;
            this.scheduleOnce(() => {
                if (this.firstCard.getId() === this.secondCard.getId()) {
                    this.firstCard.complete();
                    this.secondCard.complete();

                    if (this.counter) {
                        this.counter.coupleFound()
                    }
                }
                else {
                    this.firstCard.close();
                    this.secondCard.close();
                }
                this.firstCard = null
                this.secondCard = null

                this.isFree = true;
            }, .5);
        }
    }

    private setCard(card: Card) {
        if (this.firstCard === null) {
            this.firstCard = card;
        }
        else if (this.secondCard === null) {
            this.secondCard = card
        }
    }
}

