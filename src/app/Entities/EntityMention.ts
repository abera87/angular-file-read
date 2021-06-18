import { type } from "os";

export class EntityMention {
    Text: string;
    StartPositions: number[];
    Type: string;
    /**
     *
     */
    constructor(Text: string,
        StartPositions: number[],
        Type: string) {
        this.Text = Text;
        this.StartPositions = StartPositions;
        this.Type = Type

    }
}