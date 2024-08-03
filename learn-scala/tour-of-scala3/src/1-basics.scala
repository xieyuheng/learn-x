@main def play(): Unit = {
  println({
    val x = 1 + 1
    x + 1
  }) // 3

  val add = (x: Int, y: Int) => x + y
  println(add(1, 2)) // 3
}
