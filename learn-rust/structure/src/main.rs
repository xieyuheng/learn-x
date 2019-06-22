#[derive(Debug)]

struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

fn build_user (email: String, username: String) -> User {
    // User {
    //     email: email,
    //     username: username,
    //     active: true,
    //     sign_in_count: 1,
    // }
    User {
        email,
        username,
        active: true,
        sign_in_count: 1,
    }
}

struct Color (i32, i32, i32);
struct Point (i32, i32, i32);

struct Unit;

fn main () {
    let user1 = build_user (
        String::from ("someone@example.com"),
        String::from ("someusername123"));
    println! ("user1 : {:?}", user1);

    let user2 = User {
        email: String::from ("another@example.com"),
        username: String::from ("anotherusername567"),
        ..user1
    };
    println! ("user2 : {:?}", user2);

    let black = Color (0, 0, 0);
    let origin = Point (0, 0, 0);

    // no {:?} for Tuple Struct
    // println! ("black : {:?}", black);
    // println! ("origin : {:?}", origin);

    let unit = Unit;
    // println! ("unit : {:?}", unit);
}
