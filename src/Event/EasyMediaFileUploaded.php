<?php

declare(strict_types=1);

namespace Adeliom\EasyMediaBundle\Event;

use Symfony\Contracts\EventDispatcher\Event;

class EasyMediaFileUploaded extends Event
{
    /**
     * @var string
     */
    public const NAME = 'em.file.uploaded';

    public $filePath;

    public $mimeType;

    public $options = [];

    public function __construct($filePath, $mimeType, $options = [])
    {
    }
}
