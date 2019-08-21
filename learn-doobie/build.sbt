scalaVersion := "2.12.9"

scalacOptions ++= Seq(
  "-Ypartial-unification",
  "-deprecation",
  "-encoding", "UTF-8",
  "-unchecked",
  "-feature",
  "-language:higherKinds",
  "-language:implicitConversions",
  "-Xfatal-warnings",
)

lazy val doobieVersion = "0.7.0"
lazy val catsVersion = "2.0.0-RC1"

libraryDependencies ++= Seq(
  "org.typelevel" %% "cats-core" % catsVersion,
  "org.tpolecat" %% "doobie-core" % doobieVersion,
  "org.tpolecat" %% "doobie-postgres" % doobieVersion,
  "org.tpolecat" %% "doobie-specs2" % doobieVersion,
  "org.scalatest" %% "scalatest" % "3.0.8" % "test",
)

enablePlugins(JavaAppPackaging)
resolvers += Resolver.sonatypeRepo("releases")
addCompilerPlugin("org.typelevel" %% "kind-projector" % "0.10.3")
addCompilerPlugin("org.typelevel" % "kind-projector" % "0.10.3" cross CrossVersion.binary)
