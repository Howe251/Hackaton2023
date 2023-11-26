// import { Aircraft } from "./aircraft.dto";

import { ContextDto } from "./context.dto";

// export class Flightplan extends Aircraft {
//     flightplan: string;
// }

export class Flightplan extends ContextDto {
    id: string;
    name: string;
    description: string;
}
