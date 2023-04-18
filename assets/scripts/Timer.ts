import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Timer')
export class Timer extends Component {
    private timer: number = 0;

    protected start(): void {
        this.schedule(this.addSecond, 1);
    }

    public stop() {
        this.unschedule(this.addSecond);
    }

    private addSecond() {
        this.node.getComponent(Label).string = this.format(this.timer)
        this.timer++;
    }

    private format(seconds: number) {
        const minutes = Math.floor(seconds / 60);

        const addZero = (number: number): string => {
            return number > 9 ? number.toString() : '0' + number.toString()
        } 
        return addZero(minutes) + ':' + addZero(seconds % 60)
    }
}

