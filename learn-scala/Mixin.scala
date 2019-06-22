abstract class AbsIterator {
  type T
  def hasNext: Boolean
  def next: T
}

class StringIterator(s: String) extends AbsIterator {
  type T = Char
  private var i = 0
  def hasNext = i < s.length
  def next = {
    val ch = s charAt i
    i += 1
    ch
  }
}

trait RichIterator extends AbsIterator {
  def foreach(f: T => Unit) = while (hasNext) f(next)
}

class RichStringIter(s: String) extends StringIterator(s) with RichIterator

object Mixin {
  def main(args: Array[String]): Unit = {
    val s = new RichStringIter("abc")
    s.foreach (println)
  }
}
