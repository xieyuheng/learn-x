scalaVersion := "2.12.9"

scalacOptions += "-Ypartial-unification"

lazy val doobieVersion = "0.7.0"

libraryDependencies ++= Seq(
  "org.tpolecat" %% "doobie-core"     % doobieVersion,
  "org.tpolecat" %% "doobie-postgres" % doobieVersion,
  "org.tpolecat" %% "doobie-specs2"   % doobieVersion
)
