(ns play
  (:require [datascript.core :as d]))

(def x "Hello world!")

(println
 (let [schema {:aka {:db/cardinality :db.cardinality/many}}
       conn   (d/create-conn schema)]
   (d/transact! conn [ { :db/id -1
                        :name  "Maksim"
                        :age   45
                        :aka   ["Max Otto von Stierlitz", "Jack Ryan"] } ])
   (d/q '[ :find  ?n ?a
          :where [?e :aka "Max Otto von Stierlitz"]
          [?e :name ?n]
          [?e :age  ?a] ]
        @conn)))
