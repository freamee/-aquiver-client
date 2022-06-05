import { Vector3Mp } from '../Utils';

export class ClientPlayer<ISharedVars> {
    public sharedVariables: Partial<ISharedVars> = {};

    private _x: number;
    private _y: number;
    private _z: number;

    constructor() {
        onNet('player-set-variable', this.EVENT_SetSharedVariable);
        onNet('play-animation', this.EVENT_PlayAnimation);
        onNet('stop-animation', this.EVENT_StopAnimation);

        setInterval(() => {
            const [x, y, z] = GetEntityCoords(this.playerPed, false);
            this._x = x;
            this._y = y;
            this._z = z;
        }, 100);
    }

    public get playerPed() {
        return PlayerPedId();
    }

    public get position() {
        return new Vector3Mp(this._x, this._y, this._z);
    }

    public set position(v3: Vector3Mp) {
        this._x = v3.x;
        this._y = v3.y;
        this._z = v3.z;
        SetEntityCoords(this.playerPed, v3.x, v3.y, v3.z, false, false, false, false);
    }

    private EVENT_SetSharedVariable(key: string, value: any) {
        this.sharedVariables[key] = value;
    }

    private async EVENT_PlayAnimation(dict: string, anim: string, flag: number) {
        RequestAnimDict(dict);
        await new Promise((resolve) => {
            let tries = 0;
            let c = setInterval(() => {
                if (HasAnimDictLoaded(dict) || tries > 50) {
                    resolve(true);
                    if (c) clearInterval(c);
                }
                tries++;
            }, 30);
        });

        TaskPlayAnim(this.playerPed, dict, anim, 8.0, 8.0, -1, flag, 0, false, false, false);
    }

    private EVENT_StopAnimation() {
        ClearPedTasksImmediately(this.playerPed);
    }
}