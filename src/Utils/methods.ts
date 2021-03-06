import { Vector3Mp } from "./vector3";

/** Get distance between two 3d coordinates. */
export function Distance(v: { x: number; y: number; z: number }, v_2: { x: number; y: number; z: number }) {
    v = new Vector3Mp(v.x, v.y, v.z);
    v_2 = new Vector3Mp(v_2.x, v_2.y, v_2.z);

    return (v as Vector3Mp).distanceTo(v_2 as Vector3Mp);
}

/** Get random index from array. */
export function randomIndexFromArray(array: any[]) {
    return Math.floor(Math.random() * array.length);
}

/** Get random value from array. */
export function randomFromArray<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)];
}

/** Async waiter for loops or any other await. */
export function Wait(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
