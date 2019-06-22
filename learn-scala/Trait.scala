trait Iterator[A] {
  def hasNext: Boolean
  def next: A
}

class IntIterator(to: Int) extends Iterator[Int] {
  var current = 0
  def hasNext: Boolean = current < to
  def next: Int = {
    if (hasNext) {
      val t = current
      current += 1
      t
    } else 0
  }
}

object Trait {
  def main(args: Array[String]): Unit = {
    val iterator = new IntIterator(10)
    println(iterator.next)
    println(iterator.next)
  }
}
