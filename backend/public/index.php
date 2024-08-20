<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../vendor/autoload.php';

use App\Classes\Product;

header('Content-Type: application/json');

$response = ['success' => false, 'products' => [], 'error' => ''];


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $response = ['success' => false, 'error' => ''];

    if (isset($data['delete_ids'])) {
        $error = Product::delete($data['delete_ids']);
        $response['success'] = $error ? false : true;
        $response['error'] = $error;
    }
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
} else {

    $products = Product::list();
    $response['products'] = array_map(function ($product) {
        return [
            'sku' => $product->getSku(),
            'name' => $product->getName(),
            'price' => $product->getPrice(),
            'attribute' => $product->getAttribute(),
        ];
    }, $products);
}

echo json_encode($response);
