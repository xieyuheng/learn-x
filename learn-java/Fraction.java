// public class Fraction {

//     Integer num;
//     Integer den;

//     public Fraction (Integer num, Integer den) {
//         this.num = num;
//         this.den = den;
//     }

//     public Fraction add (Fraction that) {
//         Integer new_num = that.den * this.num + this.den * that.num;
//         Integer new_den = this.den * that.den;
//         return new Fraction (new_num, new_den);
//     }

//     public Fraction mul (Fraction that) {
//         Integer new_num = this.num * that.num;
//         Integer new_den = this.den * that.den;
//         return new Fraction (new_num, new_den);
//     }

//     public String toString () {
//         return this.num.toString () + "/" + this.den.toString ();
//     }

//     public static void main (String [] args) {
//         Fraction f1 = new Fraction (1, 2);
//         Fraction f2 = new Fraction (2, 3);

//         System.out.println (f1.add (f2));
//         System.out.println (f1.mul (f2));
//     }

// }


public class Fraction extends Number {

    Integer num;
    Integer den;

    public
    Fraction (Integer num, Integer den) {
        this.num = num;
        this.den = den;
    }

    public Fraction
    add (Fraction that) {
        Integer new_num = that.den * this.num + this.den * that.num;
        Integer new_den = this.den * that.den;
        return new Fraction (new_num, new_den);
    }

    public Fraction
    mul (Fraction that) {
        Integer new_num = this.num * that.num;
        Integer new_den = this.den * that.den;
        return new Fraction (new_num, new_den);
    }

    public String
    toString () {
        return this.num.toString () + "/" + this.den.toString ();
    }

    public double
    doubleValue () {
        return this.num.doubleValue () / this.den.doubleValue ();
    }


    public float
    floatValue () {
        return this.numerator.floatValue() / denominator.floatValue();
    }


    public int
    intValue () {
        return numerator.intValue() / denominator.intValue();
    }

    public long
    longValue () {
        return numerator.longValue() / denominator.longValue();
    }

    public static void
    main (String [] args) {
        Fraction f1 = new Fraction (1, 2);
        Fraction f2 = new Fraction (2, 3);

        System.out.println (f1.add (f2));
        System.out.println (f1.mul (f2));
    }

}
