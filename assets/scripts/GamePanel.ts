import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { Card } from './Card';
const { ccclass, property } = _decorator;

@ccclass('GamePanel')
export class GamePanel extends Component {
    @property({ type: Node })
    private itemsContainer: Node = null;

    private items: SpriteFrame[] = [];
    private cards: Sprite[] = [];

    private itemsCount: number = 4;
    private cardsCount = 16;

    private isLoaded: boolean = false;

    protected async start() {
        await this.initItems();
        await this.initCards();
        await this.addItems();
        
        this.isLoaded = true
    }

    public getItemsList(): SpriteFrame[] {
        if (this.isLoaded) {
            return this.items
        }
        return []
    }

    public getCardsList(): Sprite[] {
        if (this.isLoaded) {
            return this.cards
        }
        return []
    }

    private async initItems(): Promise<void> {
        if (this.itemsContainer) {
            let counter = 0;
            while (true) {
                const newSprite = this.itemsContainer.getChildByName(counter.toString());

                if (newSprite) {
                    this.items.push(newSprite.getComponent(Sprite).spriteFrame);
                    counter++;
                }
                else {
                    break
                }
            }
        }
    }

    private async initCards(): Promise<void> {
        for (let index = 0; index < this.cardsCount; index++) {
            const newCard = this.node.getChildByName('Card-' + index.toString());

            if (newCard) {
                this.cards.push(newCard.getComponent(Sprite));
            }
        }
    }

    private async addItems(): Promise<void> {
        this.cards.forEach((card: Sprite) => {
            const randomNumber = this.getRandomNumber()
            card.getComponent(Card).setId(randomNumber);
        });
    }

    getRandomNumber(): number {
        const min = Math.ceil(1);
        const max = Math.floor(this.itemsCount);
        return Math.floor(Math.random() * (max - min) + min);
    }
}

