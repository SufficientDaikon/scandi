<?php

namespace App\Classes;

class DVD extends Product
{
    protected string $type = 'DVD';

    public function setAttributeToSave(string $size): void
    {
        $this->attribute = 'Size: ' . $size . ' MB';
    }
    public function setAttribute(string $size): void
    {
        $this->attribute = $size;
    }

    public function getAttribute(): string
    {
        return $this->attribute;
    }
}
