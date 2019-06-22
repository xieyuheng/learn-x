.ONESHELL:
hc = ghc
# copy = rsync --recursive --links --perms --times --group --owner --devices --specials --verbose --human-readable
# w = -Wno-int-conversion -Wno-incompatible-pointer-types -Wunused-value
# o = -O2
# l = -ldl
f = -dynamic


build:
	$(hc) $(w) $(o) $(f) $(l) hi.hs

clean:
	rm -f *~ *.hi *.o
