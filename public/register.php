<?php

require_once '../util/DB.php';

// Map submitted form data to fields array
$fields = [
    'first_name' => $_POST['firstName'],
    'last_name'  => $_POST['lastName'],
    'address1'   => $_POST['address1'],
    'address2'   => (isset($_POST['address2'])) ? $_POST['address2'] : null,
    'city'       => $_POST['city'],
    'state'      => $_POST['state'],
    'zip'        => $_POST['zip'],
    'country'    => $_POST['country'],
    'created_at' => date('Y-m-d H:i:s'),
];

$db = new DB();
$db->insert('users', $fields);

echo json_encode($fields);
