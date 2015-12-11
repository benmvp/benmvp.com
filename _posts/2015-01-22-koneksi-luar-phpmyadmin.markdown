---
layout: post
title:  "PHPMyAdmin: Koneksi ke Basisdata Luar"
date:   2015-01-22 11:57:08
categories: basis-data koneksi
author: Edwin Lunando
author_t: edwinlunando
permalink: koneksi-ke-luar-phpmyadmin
description: koneksi ke basis data luar melalui PHPMyAdmin
---

[phpMyAdmin][0] merupakan sebuah kakas yang digunakan untuk mengatur basis data [MySQL][1] yang sudah sangat umum untuk digunakan. Saya selalu menggunakan phpMyAdmin jika menyiapkan basis data baru untuk memudahkan akses dan penanganan basis data. Saya hanya perlu mengakses phpMyAdmin dari browser, lalu saya bisa langsung mengobrak-abrik MySQL yang saya punya. :))

Biasanya, saya menggunakan phpMyAdmin untuk mengatur basisdata di server yang sama. Jadi, phpMyAdmin hanya perlu membuat koneksi ke lokal. Sekarang, saya harus mengatur MySQL di server yang berbeda. Mekanismenya cukup sederhana karena pada dasarnya, phpMyAdmin sudah mendukung multi koneksi terhadap banyak server sekaligus.

Untuk teknisnya, cari dan buka berkas `config.inc.php`. Jika Anda menginstal phpMyAdmin menggunakan debian, biasanya berkas tersebut terdapat di `/etc/phpmyadmin/config.inc.php`. Setelah membuka berkas tersebut, tambahkan kode di bawah ini sesuai dengan kebutuhan.

    $cfg['Servers'][$i]['verbose']       = 'Rayquaza';  // Bisa diganti
    $cfg['Servers'][$i]['host']          = '127.0.0.1'; // URL atau IP
    $cfg['Servers'][$i]['port']          = '3306';      // Biasanya 3306
    $cfg['Servers'][$i]['connect_type']  = 'tcp';       // Biarkan TCP
    $cfg['Servers'][$i]['extension']     = 'mysqli';    // Basanya mysqli
    $cfg['Servers'][$i]['compress']      = FALSE;       // Biasanya False
    $cfg['Servers'][$i]['auth_type']     = 'cookie';    // Cookie cukup
    $i++;

Setelah itu, pilihan server `Rayquaza` akan tampil di halaman depan phpMyAdmin dan dapat digunakan untuk mengatur basisdata MySQL di luar. ^^

[0]:    http://www.phpmyadmin.net/home_page/index.php
[1]:    http://www.mysql.com/
