import { Schedulable } from "./schedulable"

function Bicycle(): Schedulable {
  return Schedulable({ lead_days: 1 })
}

function Vehicle(): Schedulable {
  return Schedulable({ lead_days: 3 })
}

function Mechanic(): Schedulable {
  return Schedulable({ lead_days: 4 })
}

const schedulables = [
  Bicycle(),
  Vehicle(),
  Mechanic(),
]

for (const schedulable of schedulables) {
  console.log(schedulable.schedulable_p(13, 14))
}
