import { _decorator, Button, Component, Node, Sprite } from 'cc';
import { GamePanel } from './GamePanel';
import { GameProcess } from './GameProcess';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {
    @property({type: Node})
    private gamePanel: Node = null;

    private id: number = 0;

    private isClosed: boolean = true
    
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public clickHandler(): void {
        const gameProcess = this.gamePanel.getComponent(GameProcess)
        
        if (this.isClosed && gameProcess.getProcessStatus()) {
            this.open();
            gameProcess.cardHandler(this.node.getComponent(Card));
        }
    }

    public close(): void {
        if (this.gamePanel) {
            this.node.getComponent(Sprite).spriteFrame = this.gamePanel.getComponent(GamePanel).getItemsList()[0];
        }
        this.isClosed = true
    }

    public complete(): void {
        this.node.getComponent(Button).onDisable();
    }
    
    private open(): void {
        if (this.gamePanel) {
            this.node.getComponent(Sprite).spriteFrame = this.gamePanel.getComponent(GamePanel).getItemsList()[this.id];
        }
        this.isClosed = false
    }
}

