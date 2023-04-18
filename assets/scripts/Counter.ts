import { _decorator, Component, Label, Node } from 'cc';
import { GlobalLogic } from './GlobalLogic';
const { ccclass, property } = _decorator;

@ccclass('Counter')
export class Counter extends Component {
    @property({ type: GlobalLogic })
    private globalLogic: GlobalLogic = null;

    private total: number = 8;
    private value: number = 0;

    public coupleFound() {
        this.value++;
        this.node.getComponent(Label).string = this.value.toString() + '/' + this.total.toString();
        
        if (this.value >= this.total) {
            if (this.globalLogic) {
                this.globalLogic.gameOver()
            }
        }
    }
}

