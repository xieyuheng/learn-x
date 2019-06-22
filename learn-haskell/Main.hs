module Main (main) where

import Tree ( Tree(Leaf,Branch)
            , fringe
            )

main = print (fringe (Branch (Leaf 1) (Leaf 2)))
