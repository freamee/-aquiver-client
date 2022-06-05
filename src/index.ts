export * from './config';
export * from './Aquiver';
export * as Utils from './Utils';

on('onClientResourceStart', (resourceName: string) => {
    if (GetCurrentResourceName() !== resourceName) return;
    emitNet('player-started-resource', resourceName);
});
