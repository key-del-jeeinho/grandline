import { inject, injectable } from "inversify";
import { QueryGrandlineCase } from "./grandline.usecase.query";
import { ExistsGrandlineOutput } from "./grandline.output.exists";

@injectable()
export class GrandlineService implements QueryGrandlineCase {
    constructor(
        @inject(ExistsGrandlineOutput) private readonly existsGrandlineOutput: ExistsGrandlineOutput
    ) {}

    async exists(): Promise<boolean> {
        return this.existsGrandlineOutput.exists()
    }
}