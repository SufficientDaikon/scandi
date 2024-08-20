<?php

namespace App\Classes;

class Book extends Product
{
    protected string $type = 'Book';

    public function setAttributeToSave(string $weight): void
    {
        $this->attribute = 'Weight: ' . $weight . ' Kg';
    }
    public function setAttribute(string $weight): void
    {
        $this->attribute =  $weight;
    }

    public function getAttribute(): string
    {
        
        return $this->attribute;
    }
}
