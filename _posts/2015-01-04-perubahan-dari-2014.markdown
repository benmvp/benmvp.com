---
layout: post
title:  "Perubahan di 2014"
date:   2015-01-04 11:57:08
categories: pengalaman ngoding
author: Edwin Lunando
author_t: edwinlunando
permalink: /2014
description: perubahan metode koding pada 2014
---

Selamat tahun baru! Setelah waktu yang cukup lama, kita meninggalkan tahun 2014. Tahun 2014 sudah menjadi tahun yang sangat aktif. Begitu banyak perubahan dalam ekosistem pemrograman dan banyak juga hal baru yang saya pelajari. Berikut merupakan beberapa momen yang penting dalam dunia pemrograman dalam pandangan saya. :)

## Draf HTTP 2.0 Selesai! ##

Setelah pengerjaan dari tahun 2012, pada akhirnya spesifikasi protokol baru untuk aplikasi web sudah selesai. Desain dari [HTTP 2.0][1] ini bertujuan untuk meningkatkan perfoma latency aplikasi web yang selama ini terhambat karena batasan-batasan yang terdapat pada HTTP 1.1. Mekanisme dari HTTP 2.0 tetap sama dengan HTTP 1.1, yang berubah adalah metode dari pengiriman data, sehingga aplikasi yang dibuat dengan HTTP 1.1 bisa langsung melakukan migrasi ke HTTP 2.0 jika peramban dan server sudah mumpuni.

## Migrasi Pada Django ##

At last!, salah satu fitur legendaris yang merupakan salah satu paling penting diimplementasi di [Django][2]. Sebelumnya, kita perlu menggunakan South untuk [migrasi][3], sekarang tidak perlu lagi. :).

## Menemukan codeshare.io dan codepen.io ##

Sebelumnya, jika saya ingin membagikan kode saya, saya menggunakan pastebin.com sekarang sudah tidak lagi. Sekarang dengan kedua situs tersebut, membagikan kode sangat seru dan mudah. Untuk kode umum, gunakan [codeshare.io][4]. Untuk kode HTML, JS, dan CSS, gunakan [codepen.io][5].

## Mengembangnya Pengguna Go ##

Saya sangat melihat perkembangan bahasa [Go][6] di tahun 2014. Cukup banyak perusahaan yang mempertimbangkan untuk mengganti bahasa yang mereka gunakan ke Go dan beberapa teman saya sudah mulai menulis aplikasi dalam bahasa Go. Saya sendiri mempertimbangkan sebagai alternatif jika Python sudah menjadi bottleneck performa. :)

## Fitur Flexbox dan SASS ##

Walaupun sebenarnya [flexbox][7] dan [sass][10] sudah ada sejak lama, tapi saya baru menemukannya pada tahun 2014 dan saya rasa kedua metode pada CSS ini sangat bagus untuk dijadikan standar yang selanjutnya.

Flexbox membuat pengerjaan layout pada HTML menjadi jauh lebih mudah dan simpel. Sedangkan SASS membuat menulis kode CSS menjadi jauh lebih rapih dan terstruktur. Dan berita bahagianya, mayoritas browser sudah mendukung flexbox(sekitar 80%). Aku harap, di tahun 2015 ini, pengguna peramban yang mendukung flexbox menjadi lebih banyak lagi.

## Performa Modul PageSpeed ##

Yak, ini merupakan modul dari web server yang paling saya senangi. Modul [Pagespeed][11] merupakan salah satu add-on dari web server Nginx dan Apache yang secara otomatis mengoptimasi berkas-berkas statik. Kita hanya perlu menginstal dan melakukan sedikit konfigurasi. Lalu, secara otomatis aplikasi kita akan berjalan lebih cepat. :). Hanya satu yang membuat repot dalam menggunakan modul ini, yaitu, jika kita menggunakan Nginx, kita perlu mengkompilasi ulang Nginx.

## Kesimpulan ##

Intinya, banyak sekali perubahan signifikan yang terus membentuk dunia pemrograman pada tahun 2014. Tulisan di atas hanyalah beberapa momen yang menurut saya penting. Karena saya merupakan web backend engineer, tentunya momen-momen terkait itu yang menurut saya penting. XD. Selain itu, perkembangan yang begitu pesat dikarenakan dunia open source yang sangat aktif. Saya sendiri pun sudah memulai menulis pustaka open source saya yaitu, [django-naomi][8] dan [arunafelt][9]. Semoga di tahun 2015 dunia pemrograman menjadi lebih maju. :D

[1]:    https://http2.github.io/
[2]:    https://www.djangoproject.com/
[3]:    https://docs.djangoproject.com/en/dev/topics/migrations/
[4]:    http://codeshare.io/
[5]:    http://codepen.io/
[6]:    https://golang.org/
[7]:    https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes
[8]:    https://pypi.python.org/pypi/django-naomi
[9]:    https://github.com/edwinlunando/arunafelt
[10]:   http://sass-lang.com/
[11]:   https://developers.google.com/speed/pagespeed/module
