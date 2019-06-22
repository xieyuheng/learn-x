fn main() {
    {
        // Mutability
        let mut x = 5;
        println!("The value of x is: {}", x);
        x = 6;
        println!("The value of x is: {}", x);
    }

    {
        // Constants
        const MAX_POINTS: u32 = 100_000;
        println!("The MAX_POINTS is: {}", MAX_POINTS);
    }

    {
        // Shadowing
        let x = 5;
        let x = x + 1;
        let x = x * 2;
        println!("The value of x is: {}", x);
    }

    {
        // Shadowing with different type
        let spaces = "   ";
        let spaces = spaces.len();
        println!("The spaces is: {}", spaces);
    }
}
