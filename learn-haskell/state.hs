import Control.Monad

-------------------------------------------------------------------------------
-- State Monad Implementation
-------------------------------------------------------------------------------

newtype State s a = State { runState :: s -> (a,s) }

instance Monad (State s) where
  return a = State $ \s -> (a, s)

  State act >>= k = State $ \s ->
    let (a, s') = act s
    in runState (k a) s'

get :: State s s
get = State $ \s -> (s, s)

put :: s -> State s ()
put s = State $ \_ -> ((), s)

modify :: (s -> s) -> State s ()
modify f = get >>= \x -> put (f x)

evalState :: State s a -> s -> a
evalState act = fst . runState act

execState :: State s a -> s -> s
execState act = snd . runState act

-------------------------------------------------------------------------------
-- Example
-------------------------------------------------------------------------------

type Stack = [Int]

empty :: Stack
empty = []

pop :: State Stack Int
pop = State $ \(x:xs) -> (x,xs)

push :: Int -> State Stack ()
push a = State $ \xs -> ((),a:xs)

tos :: State Stack Int
tos = State $ \(x:xs) -> (x,x:xs)

stackManip :: State Stack Int
stackManip = do
    push 10
    push 20
    a <- pop
    b <- pop
    push (a+b)
    tos

main :: IO ()
main = do
  let res = evalState stackManip empty
  print res
