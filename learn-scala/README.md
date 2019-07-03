# learn-scala

## Youtube Channels

- [Scala Days Conferences](https://www.youtube.com/channel/UCOHg8YCiyMVRRxb3mJT_0Mg)

## Martin Odersky

- [FOSDEM 2009 Scala - A Scalable Language](https://www.youtube.com/watch?v=zqFryHC018k)
  - In this talk the author describes the design principles of the Scala programming language,
    which has scalability as its primary design objective.

- ["Working Hard to Keep It Simple" - OSCON Java 2011](https://www.youtube.com/watch?v=3jg1AheF4n0)
  - Why we need functional programming and actor model
  - Object oriented programming is as important as functional programming

- [Plain Functional Programming, 2017, at Devoxx](https://www.youtube.com/watch?v=YXDm3WHZT5g)
  - Kleisli triples v.s. implicit function type
  - with a reference to [Strategic Scala Style: Principle of Least Power](http://www.lihaoyi.com/post/StrategicScalaStylePrincipleofLeastPower.html)

- [From DOT to Dotty by Martin Odersky](https://www.youtube.com/watch?v=iobC5yGRWoo)
  - About the theoretic foundation of Scala, i.e. DOT (with dependent type restricted to path)
  - implicit function type in dotty (scala 3.x)

- [Keynote - What to Leave Implicit by Martin Odersky](https://www.youtube.com/watch?v=Oij5V7LQJsA)
  - Scala Days Chicago 2017

## Slick

- [Polymorphic record types in a lifted embedding - by Stefan Zeiger](https://www.youtube.com/watch?v=tS6N5AaZTLA)
  - Scala Days New York, 2016
  - an overview of the "lifted embedding" at the core of the Scala DSL in Slick.
  - "lifted embedding" is a tech to enable type check of target language in scala's type system
    - "embedding" means designing AST and writing interpreter in scala
    - "lifted" means `T` to `F[T]`

## DOT (Dependent Object Type)

- So called "Dependent Object Type" means dependent type restricted to path.

- [DOT: Scala Types from Theory to Practice—Nada Amin](https://www.youtube.com/watch?v=fjj_fv346lY)
  - Scala World, 2017

## Misc

- [The Last 10 Percent by Stefan Zeiger](https://www.youtube.com/watch?v=RmEMUwfQoSc)
  - about publishing open source scala library, which is infinitely more complicated than npm.
    (I would rather writing scripts to use libraries locally than to use this)
  - scala's npmjs.org is Sonatype,
    - sbt's docs about using it: https://www.scala-sbt.org/1.x/docs/Using-Sonatype.html
    - which direct you to another docs at: https://central.sonatype.org/pages/ossrh-guide.html
      which says:
      ```
      Sonatype uses JIRA to manage requests.
      - Create your JIRA account
      - Create a New Project ticket
        This triggers creation of your repositories.
        Normally, the process takes less than 2 business days.
      ```
