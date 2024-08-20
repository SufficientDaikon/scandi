<?php

namespace App\Classes;

use InvalidArgumentException;

class ProductFactory
{
    private static array $productMap = [
        'DVD' => DVD::class,
        'Book' => Book::class,
        'Furniture' => Furniture::class,
    ];

    public static function createProduct(string $type, string $sku, string $name, float $price, string $attribute): Product
    {
        if (!isset(self::$productMap[$type])) {
            throw new InvalidArgumentException('Invalid product type.');
        }

        $className = self::$productMap[$type];
        return new $className($sku, $name, $price, $attribute);
    }
}
