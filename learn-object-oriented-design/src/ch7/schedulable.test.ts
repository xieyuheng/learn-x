import { Schedulable } from "./schedulable"

type Bicycle = {
  kind: "Bicycle"
} & Schedulable

function Bicycle(): Bicycle {
  return {
    kind: "Bicycle",
    ...Schedulable({ lead_days: 1 }),
  }
}

type Vehicle = {
  kind: "Vehicle"
} & Schedulable

function Vehicle(): Vehicle {
  return {
    kind: "Vehicle",
    ...Schedulable({ lead_days: 3 }),
  }
}

type Mechanic = {
  kind: "Mechanic"
} & Schedulable

function Mechanic(): Mechanic {
  return {
    kind: "Mechanic",
    ...Schedulable({ lead_days: 4 }),
  }
}

const schedulables = [Bicycle(), Vehicle(), Mechanic()]

for (const schedulable of schedulables) {
  console.log(schedulable.schedulable_p(13, 14))
}
