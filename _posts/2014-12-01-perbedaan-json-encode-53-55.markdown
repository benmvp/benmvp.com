---
layout: post
title:  "Mengatasi Perbedaan json_encode pada PHP 5.3 dan 5.5"
date:   2014-12-01 11:57:08
categories: php json
author: Edwin Lunando
author_t: edwinlunando
permalink: perbedaan-json-encode-php-53-55
description: perbedaan json encode pada php 5.3 dan 5.5
---

Jadi, barusan saja saya mengalami masalah dalam menjalankan aplikasi web berbasis PHP. Sebuah proyek yang sudah cukup lama dengan versi PHP yang sudah cukup tua yaitu 5.3. Saat saya mencoba menjalankan aplikasi tersebut dengan PHP 5.5, beberapa halaman dari aplikasi tersebut tidak berjalan sesuai dengan keinginan saya. Setelah melakukan eksplorasi selama beberapa jam, akhirnya saya menemukan permasalahannya, berikut hasilnya.

Menurut [artikel ini][2], ternyata pustaka JSON di versi PHP mulai 5.5rc2 itu berbeda implementasi dengan PHP versi yang sebelumnya karena permasalahan lisensi. Pada kasus saya, aplikasi web yang sedang saya tangani ini memang menggunakan pustaka JSON dengan jumlah yang cukup banyak.

Setelah mencari tahu, ternyata implementasi kode `json_encode` di pustaka JSON yang baru lebih kebal terhadap perbedaan encoding. Jika terdapat karakter dengan encoding yang salah, maka fungsi `json_encode` akan langsung mengirimkan nilai `null`. Solusi sederhana saya adalah, dengan memaksakan semua string yang akan dijadikan JSON diubah encoding-nya menjadi `UTF-8`, encoding yang paling umum digunakan. Berikut merupakan fungsi yang saya gunakan untuk mengubah encoding string.

{% highlight php startinline %}
function ubahEncoding(array $array, $encoding='utf-8')
{
    foreach ($array as $key => $value)
    {
        switch (gettype($value)) {
            case 'array':
                $array[$key] = ubahEncoding($value, $encoding);
                break;
            case 'string':
                $array[$key] = mb_convert_encoding($value, $encoding);
                break;
        }
    }
    return $array;
}
{% endhighlight %}

Secara singkat, fungsi tersebut akan berjalan dengan cara rekursif, jika elemen dalam array tersebut adalah array, maka dia akan memanggil fungsi tersebut lagi. Jika, elemennya adalah string, maka string tersebut akan diubah dengan fungsi `mb_convert_encoding`. Setelah menggunakan fungsi ini, semua halaman aplikasi web saya kembali berjalan dengan baik. Terima kasih. :)


[1]:    http://www.codeigniter.com/
[2]:    http://iteration9.com/2013/php-json-licensing-and-php-5-5/
