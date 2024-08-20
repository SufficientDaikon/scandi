<?php

namespace App;

require_once '../vendor/autoload.php';

class Database
{
    private static ?Database $instance = null;
    private \PDO $connection;

    private function __construct()
    {
        
        $uri = $_ENV['DATABASE_URI'] ?? null;
        $fields = parse_url($uri);

        // Build the DSN including SSL settings
        $dsn = "mysql:";
        $dsn .= "host=" . $fields["host"];
        $dsn .= ";port=" . $fields["port"];
        $dsn .= ";dbname=task";
        $dsn .= ";sslmode=verify-ca;sslrootcert=path/to/ca.pem";

        try {
            $this->connection = new \PDO($dsn, $fields["user"], $fields["pass"], [
                \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            ]);
        } catch (\PDOException $e) {
            die('Connection failed: ' . $e->getMessage());
        }
    }

    public static function getInstance(): Database
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function getConnection(): \PDO
    {
        return $this->connection;
    }
}
