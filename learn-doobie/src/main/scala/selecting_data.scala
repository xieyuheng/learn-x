object selecting_data extends App {

  import doobie._
  import doobie.implicits._
  import doobie.util.ExecutionContexts
  import cats._
  import cats.data._
  import cats.effect.IO
  import cats.implicits._
  import fs2.Stream

  implicit val cs = IO.contextShift(ExecutionContexts.synchronous)

  val xa = Transactor.fromDriverManager[IO](
    "org.postgresql.Driver",
    "jdbc:postgresql:world",
    "postgres",
    "",
    ExecutionContexts.synchronous)

  sql"select name from country"
    .query[String]    // Query0[String]
    .to[List]         // ConnectionIO[List[String]]
    .transact(xa)     // IO[List[String]]
    .unsafeRunSync    // List[String]
    .take(5)          // List[String]
    .foreach(println) // Unit

  sql"select name from country"
    .query[String]    // Query0[String]
    .stream           // Stream[ConnectionIO, String]
    .take(5)          // Stream[ConnectionIO, String]
    .compile.toList   // ConnectionIO[List[String]]
    .transact(xa)     // IO[List[String]]
    .unsafeRunSync    // List[String]
    .foreach(println) // Unit

  val y = xa.yolo // a stable reference is required
  import y._

  sql"select name from country"
    .query[String] // Query0[String]
    .stream        // Stream[ConnectionIO, String]
    .take(5)       // Stream[ConnectionIO, String]
    .quick         // IO[Unit]
    .unsafeRunSync

  sql"select name from country"
    .query[String] // Query0[String]
    .check         // IO[Unit]
    .unsafeRunSync

  sql"select code, name, population, gnp from country"
    .query[(String, String, Int, Option[Double])]
    .stream
    .take(5)
    .quick
    .unsafeRunSync

  sql"select code, name, population, gnp from country"
    .query[(String, String, Int, Option[Double])]
    .check
    .unsafeRunSync

  import shapeless._

  sql"select code, name, population, gnp from country"
    .query[String :: String :: Int :: Option[Double] :: HNil]
    .stream
    .take(5)
    .quick
    .unsafeRunSync

  import shapeless.record.Record

  type Rec = Record.`'code -> String, 'name -> String, 'pop -> Int, 'gnp -> Option[Double]`.T

  sql"select code, name, population, gnp from country"
    .query[Rec]
    .stream
    .take(5)
    .quick
    .unsafeRunSync

  case class Country(code: String, name: String, pop: Int, gnp: Option[Double])

  sql"select code, name, population, gnp from country"
    .query[Country]
    .stream
    .take(5)
    .quick
    .unsafeRunSync

  case class Code(code: String)
  case class Country2(name: String, pop: Int, gnp: Option[Double])

  sql"select code, name, population, gnp from country"
    .query[(Code, Country2)]
    .stream
    .take(5)
    .quick
    .unsafeRunSync

  sql"select code, name, population, gnp from country"
    .query[(Code, Country2)]
    .stream.take(5)
    .compile.toList
    .map(_.toMap)
    .quick
    .unsafeRunSync

  val p: Stream[IO, Country2] = {
    sql"select name, population, gnp from country"
      .query[Country2] // Query0[Country2]
      .stream          // Stream[ConnectionIO, Country2]
      .transact(xa)    // Stream[IO, Country2]
  }

  p.take(5)
    .compile.toVector
    .unsafeRunSync
    .foreach(println)

}
