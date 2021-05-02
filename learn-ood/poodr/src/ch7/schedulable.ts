import { Schedule } from "./schedule"

export type Schedulable = {
  lead_days: number
  schedule: Schedule
  schedulable_p(starting: number, ending: number): boolean
}

export function Schedulable(the: { lead_days: number }): Schedulable {
  const schedule = Schedule()
  const lead_days = the.lead_days

  return {
    schedule,
    lead_days,
    schedulable_p(starting, ending) {
      return !schedule.scheduled_p(this, starting - lead_days, ending)
    },
  }
}
