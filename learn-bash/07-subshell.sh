unset x; (x=hello; echo $x); echo $x

echo b; echo a | sort
(echo b; echo a) | sort

echo "$(echo "$(echo "$(echo "$(ps wwf | head -n 12)")")")"
