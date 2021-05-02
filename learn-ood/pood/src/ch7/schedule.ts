import { Schedulable } from "./schedulable"

export type Schedule = {
  scheduled_p(
    schedulable: Schedulable,
    starting: number,
    ending: number
  ): boolean
}

export function Schedule(): Schedule {
  return {
    scheduled_p(schedulable, starting, ending) {
      console.log({
        msg: `Available during ${starting} -- ${ending}`,
        schedulable,        
      })
      return false
    },
  }
}
