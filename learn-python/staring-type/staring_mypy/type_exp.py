from dataclasses import dataclass
# from pydantic.dataclasses import dataclass
# NOTE pydantic 的 dataclass 不支持递归定义（运行时错误）

type Exp = Var | Ap | Fn | Let

@dataclass
class Var:
    name: str

@dataclass
class Ap:
    target: Exp
    arg: Exp

@dataclass
class Fn:
    name: str
    ret: Exp

@dataclass
class Binding:
  name: str
  exp: Exp

@dataclass
class Let:
  bindings: list[Binding]
  body: Exp


def format_exp(exp: Exp) -> str:
    match exp:
        case Var(name):
            return name
        case Ap(target, arg):
            return f"({format_exp(target)} {format_exp(arg)})"
        case Fn(name, ret):
            return f"(lambda ({name}) {format_exp(ret)})"
        case Let(bindings, body):
            bindings_text = ' '.join(map(format_binding, bindings))
            return f"(let ({bindings_text}) {format_exp(body)})"


def format_binding(binding: Binding) -> str:
    return f"[{binding.name} {format_exp(binding.exp)}]"


print(format_exp(Var("x")))
print(format_exp(Ap(Var("f"), Var("x"))))
print(format_exp(Fn("x", Ap(Var("f"), Var("x")))))
print(format_exp(Let([
    Binding("x", Ap(Var("f"), Var("x"))),
    Binding("y", Ap(Var("f"), Var("x")))
], Ap(Var("x"), Var("y")))))
