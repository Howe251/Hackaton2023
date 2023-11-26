/// <reference types="node" />
export declare class DroneCommandModel {
    priority: 1 | 0;
    command: string;
    timeoutId: NodeJS.Timeout | null;
    constructor(priority: 1 | 0, command: string);
    process(cb: () => void): void;
}
