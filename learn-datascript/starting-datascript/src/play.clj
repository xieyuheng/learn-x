(require '[datascript.core :as d])

(def conn (d/create-conn))

(def datoms [{:db/id -1 :name "Bob" :age 30}
             {:db/id -2 :name "Sally" :age 15}])

(d/transact! conn datoms)

(def q-young
  '[:find ?n
    :in $ ?min-age
    :where
    [?e :name ?n]
    [?e :age ?a]
    [(< ?a ?min-age)]])

(d/q q-young @conn 18)

(d/q
 '[:find ?n
   :where
   [?e :name ?n]
   [?e :age ?a]
   [(< ?a 18)]]
 @conn)
