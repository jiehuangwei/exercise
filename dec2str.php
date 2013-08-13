<?php
/**
 * 十六进制字符转换成中文
 */

$temp = '\xE7\x82\xB9\xE6\xAD\x8C\xEF\xBC\x8C\xE7\x94\xA8\xE5\xBF\x83\xE8\x89\xAF\xE8\x8B\xA6';

// 方法一
function dec2str_1($str)
{
	$str = str_replace('\\x','%',$str);
	$str = urldecode($str);
	return $str;
}

// 方法二
function dec2str_2($str)
{
	$str = str_replace('\\x','',$str);
	$str = str_split($str,2);
	$string = '';
	for($i=0;$i<=count($str);$i++)
	{
		if ( hexdec($str[$i]) > 127 )
		{
			$v = $str[$i];
			$_v = isset($str[++$i]) ? $str[$i]: null;

			$string .= chr(hexdec($v)) . chr(hexdec($_v));
		} else {
			$string .= chr($v);
		}
	}
	return $string;
}

// echo dec2str_1($temp);
echo dec2str_2($temp);
