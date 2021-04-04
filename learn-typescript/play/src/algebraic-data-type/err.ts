export class Unhandled extends Error {
  constructor(
    public value: any,
  ) {
    super(message_for_unhandled(value))
  }
}

function message_for_unhandled(value: any) {
  if (value.abstract_class_name) {
    let message =
      `unhandled class of abstract class ${value.abstract_class_name}: ${value.constructor.name}\n` +
      `value: ${JSON.stringify(value, null, 2)}\n`
    return message
  }

  else {
    let message =
      `unhandled class (no abstract_class_name): ${value.constructor.name}\n` +
      `value: ${JSON.stringify(value, null, 2)}\n`
    return message
  }
}
