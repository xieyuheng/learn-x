// https://docs.solidjs.com/configuration/typescript#advanced-jsx-attributes-and-directives

declare module 'solid-js' {
  namespace JSX {
    interface CustomEvents extends HTMLElementEventMap {}
    interface CustomCaptureEvents extends HTMLElementEventMap {}
  }
}
