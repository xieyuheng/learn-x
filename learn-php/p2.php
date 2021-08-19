<?php
// Works with all PHP versions
$associative = array('One' => 1, 'Two' => 2, 'Three' => 3);

// PHP 5.4 introduced a new syntax
$associative = ['One' => 1, 'Two' => 2, 'Three' => 3];

// Add an element to an associative array
$associative['Four'] = 4;

// List literals implicitly assign integer keys
$array = ['One', 'Two', 'Three'];

// Add an element to the end of an array
$array[] = 'Four';
// or
array_push($array, 'Five');

// Remove element from array
unset($array[3]);

print_r($array);
?>
