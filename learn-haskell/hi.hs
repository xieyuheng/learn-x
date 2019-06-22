{-# LANGUAGE TypeSynonymInstances #-}
{-# LANGUAGE InstanceSigs #-}

module Hi where

data Tree a
  = Leaf a
  | Node (Tree a) (Tree a)
  deriving(Eq, Show)

treeMap :: (a -> b) -> Tree a -> Tree b
treeMap f (Leaf a) = Leaf (f a)
treeMap f (Node l r) = Node (treeMap f l) (treeMap f r)

instance (Functor Tree) where
  fmap f (Leaf a) = Leaf (f a)
  fmap f (Node l r) = Node (fmap f l) (fmap f r)

-- numberTree :: Tree a -> Tree Int
-- numberTree Leaf a = Leaf ???
-- numberTree Node l r = Node (numberTree l) (numberTree r)

-- numberTree :: (Tree a, Int) -> (Tree Int, Int)
-- numberTree (Leaf a, s) = (Leaf s, succ s)
-- numberTree (Node l r, s) =
--   let (l1, s1) = numberTree (l, s)
--       (r1, s2) = numberTree (r, s1)
--   in (Node l1 r1, s2)



-- class Monad m where
--   return :: a -> (m a)
--   (>>=)  :: (m a) -> (a -> (m b)) -> (m b)

-- type (State s a) = (s -> (a, s))
-- newtype State s a = State { getState :: s -> (a, s) }

-- instance Monad (State s) where
--   return :: a -> (State s a)
--   return a = (State (\ s -> (a, s)))
--   (>>=) :: (State s a)
--         -> (a -> (State s b))
--         -> (State s b)
--   ma >>= f = (State (\ s ->
--     let (a, s1) = ((getState ma) s) in
--     ((getState (f a)) s1)))


-- newtype State s a = State { runState :: s -> (a,s) }

-- instance Applicative (State s) where
--   (<*>) = ap
--   pure = return

-- instance Monad (State s) where
--   return a = State $ \s -> (a, s)

--   State act >>= k = State $ \s ->
--     let (a, s') = act s
--     in runState (k a) s'

-- get :: State s s
-- get = State $ \s -> (s, s)

-- put :: s -> State s ()
-- put s = State $ \_ -> ((), s)

-- modify :: (s -> s) -> State s ()
-- modify f = get >>= \x -> put (f x)

-- evalState :: State s a -> s -> a
-- evalState act = fst . runState act

-- execState :: State s a -> s -> s
-- execState act = snd . runState act

tick :: Int -> (Int, Int)
tick s = (s, (succ s))

return_state :: a -> s -> (a, s)
return_state a = \ s -> (a, s)

bind_state :: (s -> (a, s))
           -> (a -> (s -> (b, s)))
           -> (s -> (b, s))
bind_state ma f = \ s ->
  let (a, s1) = (ma s)
  in (f a s1)

numberTree :: (Tree a) -> Int -> (Tree Int, Int)
numberTree (Leaf a) =
  (bind_state tick
   (\ s -> (return_state (Leaf s))))
numberTree (Node l r) =
  (bind_state (numberTree l)
   (\ l1 -> (bind_state (numberTree r)
             (\ r1 -> (return_state (Node l1 r1))))))

zipTree :: Tree a -> Tree b -> Maybe (Tree (a, b))
zipTree (Leaf a) (Leaf b) = Just (Leaf (a, b))
zipTree (Node l1 r1) (Node l2 r2) = do
  l3 <- zipTree l1 l2
  r3 <- zipTree r1 r2
  return (Node l3 r3)
zipTree _ _ = Nothing

aTree :: Tree Int
aTree = (Node (Leaf 1)
               (Node (Leaf 2)
                     (Leaf 3)))

main :: IO ()
main = do
  print (fmap succ aTree)
  print ((numberTree aTree) 0)
  print ((numberTree (fmap succ aTree)) 0)
  print (zipTree aTree aTree)
  print (zipTree aTree (Leaf 4))
