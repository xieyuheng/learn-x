import { Schedulable } from "./schedulable"

type Bicycle = {
  name: "Bicycle"
} & Schedulable

function Bicycle(): Bicycle {
  return {
    name: "Bicycle",
    ...Schedulable({ lead_days: 1 }),
  }
}

type Vehicle = {
  name: "Vehicle"
} & Schedulable

function Vehicle(): Vehicle {
  return {
    name: "Vehicle",
    ...Schedulable({ lead_days: 3 }),
  }
}

type Mechanic = {
  name: "Mechanic"
} & Schedulable

function Mechanic(): Mechanic {
  return {
    name: "Mechanic",
    ...Schedulable({ lead_days: 4 }),
  }
}

const schedulables = [Bicycle(), Vehicle(), Mechanic()]

for (const schedulable of schedulables) {
  console.log(schedulable.schedulable_p(13, 14))
}
