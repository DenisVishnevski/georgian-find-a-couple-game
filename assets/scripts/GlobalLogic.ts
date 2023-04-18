import { _decorator, Component, director, Node } from 'cc';
import { Timer } from './Timer';
const { ccclass, property } = _decorator;

@ccclass('GlobalLogic')
export class GlobalLogic extends Component {
    @property({type: Node})
    private gamePanel: Node = null;

    @property({type: Timer})
    private timer: Timer = null;

    public gameOver() {
        if (this.gamePanel) {
            this.gamePanel.active = false
        }
        if (this.timer) {
            this.timer.stop();
        }
    }

    private restart() {
        director.loadScene('gameScene');
    }
}



