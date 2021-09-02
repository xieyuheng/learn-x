function simpleDecorator(): any {
  console.log('---hi I am a decorator---')
}

@simpleDecorator()
class A {

}

new A()
