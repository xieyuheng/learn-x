object connecting_to_a_database extends App {

  import doobie._
  import doobie.implicits._

  import cats._
  import cats.data._
  import cats.effect._
  import cats.implicits._

  val program1 = 42.pure[ConnectionIO]

  import doobie.util.ExecutionContexts

  implicit val cs = IO.contextShift(ExecutionContexts.synchronous)

  val xa = Transactor.fromDriverManager[IO](
    "org.postgresql.Driver",
    "jdbc:postgresql:world",
    "postgres",
    "",
    ExecutionContexts.synchronous)

  val io = program1.transact(xa)
  io.unsafeRunSync

  val program2 = sql"select 42".query[Int].unique
  val io2 = program2.transact(xa)
  io2.unsafeRunSync

  val program3: ConnectionIO[(Int, Double)] =
    for {
      a <- sql"select 42".query[Int].unique
      b <- sql"select random()".query[Double].unique
    } yield (a, b)

  program3.transact(xa).unsafeRunSync

  val program3a = {
    val a: ConnectionIO[Int] = sql"select 42".query[Int].unique
    val b: ConnectionIO[Double] = sql"select random()".query[Double].unique
      (a, b).tupled
  }

  program3a.transact(xa).unsafeRunSync

  val valuesList = program3a.replicateA(5)
  val result = valuesList.transact(xa)
  result.unsafeRunSync.foreach(println)

}
