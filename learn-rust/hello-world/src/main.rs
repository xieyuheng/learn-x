fn main () {
    let word = "a";
    let vec: Vec <&str> = word.split ('.') .collect ();
    println! ("{:?}", vec);
}
