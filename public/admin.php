<?php

ini_set('display_errors', 1);
require_once '../util/DB.php';

$db = new DB();

$selectFields = [
    'first_name',
    'last_name',
    'address1',
    'address2',
    'city',
    'state',
    'zip',
    'country',
    'created_at',
];

$users = $db->select('users', $selectFields)
    ->orderBy(['created_at DESC'])
    ->fetchArray();

var_dump($users);
exit;
