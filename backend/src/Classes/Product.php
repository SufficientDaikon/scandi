<?php

namespace App\Classes;

use App\Database;
use InvalidArgumentException;
use PDO;
use PDOStatement;
use PDOException;

abstract class Product
{
    protected string $sku;
    protected string $name;
    protected float $price;
    protected string $type;
    protected string $attribute;

    public function __construct(string $sku, string $name, float $price, string $attribute)
    {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->setAttributeToSave($attribute);
    }

    protected function setSku(string $sku): void
    {
        $this->sku = $sku;
    }

    public function getSku(): string
    {
        return $this->sku;
    }

    protected function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getName(): string
    {
        return $this->name;
    }

    protected function setPrice(float $price): void
    {
        $this->price = $price;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function getType(): string
    {
        return $this->type;
    }

    abstract protected function setAttribute(string $attributeValue): void;
    abstract protected function setAttributeToSave(string $attributeValue): void;
    abstract public function getAttribute(): string;

    public function save(): void
    {
        try {
            $conn = $this->getConnection();
            $stmt = $conn->prepare(
                'INSERT INTO products (sku, name, price, type, attribute) VALUES (?, ?, ?, ?, ?)'
            );
            $stmt->execute([
                $this->getSku(),
                $this->getName(),
                $this->getPrice(),
                $this->getType(),
                $this->getAttribute()
            ]);
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) {
                throw new InvalidArgumentException('Duplicate SKU: ' . $this->getSku());
            } else {
                throw $e;
            }
        }
    }

    public static function list(): array
    {
        $conn = self::getConnection();
        $stmt = $conn->query('SELECT * FROM products ORDER BY id');
        return self::buildProductsFromResult($stmt);
    }

    public static function delete(array $ids): void
    {
        $conn = self::getConnection();
        $idList = implode(',', array_map([$conn, 'quote'], $ids));
        $conn->exec("DELETE FROM products WHERE sku IN ($idList)");
        
    }

    private static function buildProductsFromResult(PDOStatement $stmt): array
    {
        $products = [];
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($rows as $row) {
            $products[] = self::createProductFromRow($row);
        }
        return $products;
    }

    private static function createProductFromRow(array $row): Product
    {
        $product = ProductFactory::createProduct($row['type'], $row['sku'], $row['name'], $row['price'], $row["attribute"]);
        $product->setAttribute($row['attribute']);
        return $product;
    }

    private static function getConnection(): PDO
    {
        return Database::getInstance()->getConnection();
    }

    

}
