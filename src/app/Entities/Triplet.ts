import { EntityMention } from "./EntityMention";
import { RelationMention } from "./RelationMention";

export class Triplet {
    SentId: number;
    SentText: string;
    EntityMentions: EntityMention[];
    RelationMentions: RelationMention[];
}