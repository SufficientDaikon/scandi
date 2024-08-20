<?php

require_once '../vendor/autoload.php';

use App\Classes\ProductFactory;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON input from the request body
    $input = json_decode(file_get_contents('php://input'), true);

    // Extract the data from the JSON
    $sku = $input['sku'] ?? null;
    $name = $input['name'] ?? null;
    $price = $input['price'] ?? null;
    $type = $input['type'] ?? null;
    $attribute = $input['attribute'] ?? null;

    $error = null;
    try {
        // Validate input here as necessary
        if (!$sku || !$name || !$price || !$type || !$attribute) {
            throw new InvalidArgumentException('All fields are required.');
        }

        // Create and save the product
        $product = ProductFactory::createProduct($type, $sku, $name, $price, $attribute);
        $product->save();

        // Respond with success message
        echo json_encode(['success' => true]);
    } catch (InvalidArgumentException $e) {
        // Respond with error message
        echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
    }
} else {
    // If the request method isn't POST, return an error
    echo json_encode(['error' => 'Invalid request method']);
}
