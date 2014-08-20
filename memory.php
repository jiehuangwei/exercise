<?php
class Aoo
{
    public $var = '3.1415962654';
    static $count = 0;

    public function __construct()
    {
        self::$count++;
    }
}

$baseMemory = memory_get_usage();
$max = 0;
for ( $i = 0; $i < 100000; $i++ )
{
    $max = $max < memory_get_usage() ? memory_get_usage() : $max;
    $a = new Aoo;
    $a->self = $a;
    if ( $i % 5000 === 0 )
    {
        printf( '%8d: ', $i );
        printf('%3.5f',(memory_get_usage() - $baseMemory)/1024/1024);
        echo "\r\n<br/>";
    }
}
var_dump($a);
echo $a::$count;
echo '<hr/>';
echo printf('%3.5f',($baseMemory)/1024/1024);
echo '<br/>';
echo printf('%3.5f',($max - $baseMemory)/1024/1024);