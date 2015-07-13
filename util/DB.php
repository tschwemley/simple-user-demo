<?php

/**
 * Class: DB
 * Simple wrapper around PDO connection.
 *
 * @author Tyler Schwemley
 */
class DB
{
    protected $_db;

    protected $_query;

    public function __construct($config = '../db.ini')
    {
        // Get the database config settings
        $dbSettings = parse_ini_file($config, true);

        try {
            $this->_db = new PDO(
                "{$dbSettings['driver']}:host={$dbSettings['host']};dbname={$dbSettings['dbname']}",
                $dbSettings['user'],
                $dbSettings['password']
            );
        } catch (Exception $e) {
            error_log("DB Wrapper - Unable to connect: " . $e->getMessage());
        }
    }

    /**
     * Insert a list of fields into the database for a given table
     *
     * @param string $tableName Name of the table to insert into
     * @param array $fields Array of fields to put into table.
     *   array('field_1' => 'value', ... 'field_n' => 'value')
     */
    public function insert($tableName, $fields)
    {
        $columnNames = array_keys($fields);
        $fieldsSize = sizeof($fields);

        $columnsString = $this->_createColumnsString($columnNames, $fieldsSize);
        $valuesStr = $this->_createValuesString($fieldsSize);
        $preparedString = "INSERT INTO {$tableName} {$columnsString} VALUES {$valuesStr}";

        // Prepare the insert statement and bind the params
        $stmt = $this->_db->prepare($preparedString);
        $bindArray = [];
        foreach($fields as $field) {
            $bindArray[] = $field;
        }

        $stmt->execute($bindArray);
    }

    public function select($tableName, $fields)
    {
        $selectColumns = $this->_createColumnsString($fields, sizeof($fields), true);
        $selectQuery = "SELECT {$selectColumns} FROM {$tableName}";
        $this->_query = $selectQuery;

        return $this;
    }

    public function orderBy($orderConditions)
    {
        $orderConditionsSize = sizeof($orderConditions);
        $orderStatement = ' ORDER BY';

        for ($i = 0; $i < $orderConditionsSize; ++$i) {
            $orderStatement .= " {$orderConditions[$i]}";
            if ($i != ($orderConditionsSize - 1)) {
                $orderStatement .= ',';
            }
        }

        $this->_query .= $orderStatement;

        return $this;
    }

    public function fetchArray()
    {
        $stmt = $this->_db->prepare($this->_query);
        $stmt->execute();
        $result = $stmt->fetchAll();

        return $result;
    }

    /**
     * Creates column string in the format (col1, col2, ... colN)
     *
     * @param array $columnNames an array of column names
     * @param int $n Number of columns to incude in the string
     */
    private function _createColumnsString($columnNames, $n, $noParantheses=false)
    {
        // Add '(' to beginning of string by default.
        $columnString = ($noParantheses) ?  '' : '(';

        for ($i = 0; $i < $n; ++$i) {
            $columnString .= "{$columnNames[$i]}";

            // Determine if end of string or not
            if ($i == ($n - 1)) {
                // Only add ')' if no parantheses is set to false
                $columnString .= ($noParantheses) ? '' : ')';
            } else {
                $columnString .= ', ';
            }
        }

        return $columnString;
    }

    /**
     * Creates in the format of (?, ?, ..., ?) for prpared statements based on the input number passed in.
     *
     * @param int $n Number of '?' to incude in the string
     */
    private function _createValuesString($n)
    {
        $valuesStr = '(';
        for ($i = 0; $i < $n; ++$i) {
            if ($i == ($n -1)) {
                $valuesStr .= '?)';
            }  else {
                $valuesStr .= '?, ';
            }
        }

        return $valuesStr;
    }
}
