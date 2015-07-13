<?php
// Admin report

require_once '../util/DB.php';

$db = new DB();

// Fields to select from the user table
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

// Get all users in database table
$users = $db->select('users', $selectFields)
    ->orderBy(['created_at DESC'])
    ->fetchArray();

include '../views/admin_view.php';
?>

