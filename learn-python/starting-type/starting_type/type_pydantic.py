from pydantic.dataclasses import dataclass

type Shape = Point | Circle | Rectangle

@dataclass
class Point:
    x: float
    y: float

@dataclass
class Circle:
    x: float
    y: float
    r: float

@dataclass
class Rectangle:
    x: float
    y: float
    w: float
    h: float

def print_shape(shape: Shape):
    match shape:
        case Point(x, y):
            print(f"Point {x} {y}")
        case Circle(x, y, r):
            print(f"Circle {x} {y} {r}")
        case Rectangle(x, y, w, h):
            print(f"Rectangle {x} {y} {w} {h}")

print_shape(Point(1, 2))
print_shape(Circle(3, 5, 7))
print_shape(Rectangle(11, 13, 17, 19))
# print_shape(4)  # mypy type error
