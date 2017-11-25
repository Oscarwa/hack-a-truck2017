import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct";

export class Trailer {

    constructor(
        public key: string,
        public operator: string,
        public licenseNumber: string,
        public origin: string,
        public destination: string,
        public arrival: NgbDateStruct,
        public estimatedDeparture: NgbDateStruct,
        public category: number,
        public capacity: number,
        public weigth: number,
        public isLoaded: boolean,
        public tractor: string,
        public trailer: string,
        public container: string
    ) { }
}