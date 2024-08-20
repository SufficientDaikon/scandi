<?php

namespace App\Classes;

class Furniture extends Product
{
    protected string $type = 'Furniture';

    public function setAttributeToSave(string $dimensions): void
    {
    
        $this->attribute = 'Dimensions: ' . $dimensions;
    }

    public function setAttribute(string $dimensions): void
    {
    
        $this->attribute = $dimensions;
    }

    public function getAttribute(): string
    {
        return $this->attribute;
    }
}
