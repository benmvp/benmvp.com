---
layout: post
title:  "Perpindahan ke Lubuntu: Mengurangi Pemakaian RAM"
date:   2014-12-28 11:57:08
categories: lubuntu migrasi
author: Edwin Lunando
author_t: edwinlunando
permalink: perpindahan-lubuntu
description: perpindahan ke lubuntu
---

Sampai dengan kemarin, saya masih menggunakan sistem operasi berbasis [linux][4], [Ubuntu][3], tetapi, pada akhirnya saya menutuskan untuk berubah menjadi [Lubuntu][1], salah satu rasa yang lain dari Ubuntu. salah satu alasan utama saya berganti dari Ubuntu adalah karena perfoma yang cukup lambat dari [Unity][2], GUI dari Ubuntu. Walaupun saya sudah menggunakan SSD, setelah melakukan cukup banyak aplikasi, saya langsung merasakan perlambatan. Terutama pada beberapa fitur search bar. Bahkan saya beberapa kali harus me-restart laptop saya. Karena, untuk saya, performa itu nomor satu, saya memilih untuk mengganti sistem operasi saya. :3.

Setelah saya melakukan sedikit eksplorasi, saya melihat Ubuntu menyediakan beberasa rasa GUI yang lain dan saya menemukan perbandingan penggunaan memori(RAM) dari tiap-tiap rasa Ubuntu di [sini][5]. Saya memang tidak terlalu banyak menggunakan fitur-fitur yang terdapat pada Unity. Yang paling banyak saya gunakan hanyalah search bar-nya. Jadi, dari pertimbangan pemakaian memori yang jauh lebih rendah dan mempunyai "dalaman" yang cukup sama dengan Ubuntu, saya berpindah ke Lubuntu.

## Proses Migrasi ##

Skenario saya sederhana, saya ingin menyimpan folder `home` saya dengan menformat `root` saya. Instalasi berjalan cukup lancar, walaupun ada beberapa kesalahan minor dalam pemilihan partisi. Pada akhirnya, Lubuntu terinstal dan berjalan. Sayangnya, tidak berjalan dengan baik. Pada saat booting, ada beberapa pesan error, sama seperti Ubuntu saya sebelumnya. Tidak masalah, karena hanya muncul di awal.

Setelah itu, saya langsung menghapus semua direktori konfigurasi yang tersisa dari Ubuntu saya yang dulu(direktori di home yang berawalan '.'). Lalu, saya melanjutkan dengan menginstal aplikasi-aplikasi yang saya gunakan.

## Hasil ##

Ternyata, saya ada salah perkiraan. Ada beberapa fitur umum yang saya kira terdapat di rasa Ubuntu yang lain, ternyata itu hanya milik Unity. Beberapa contohnya adalah.

1. Maximize windows hot key (ctrl + super + up)
2. Search bar
3. Transparansi window
4. Natural scrolling

Setelah saya cari, ternyata semua fitur tersebut memungkinkan untuk digunakan di Lubuntu, hanya membutuhkan "sedikit" konfigurasi saja. :)). Contohnya, untuk natural scrolling kita harus membuat file `.Xmodmap` di `home` yang berisi.

    pointer = 1 2 3 5 4 6 7 8 9 10 11 12

Untuk search bar, perintah `run` cukup membantu karena saya memang biasanya hanya mencari aplikasi. Sisanya, aplikasi yang saya gunakan berjalan dengan lancar.

Sampai sekarang, saya cukup senang dengan Lubuntu yang saya instal. Saya sudah menkonfigurasi sedemikian sehingga pengalaman saya menggunakan Lubuntu tidak berbeda jauh dengan menggunakan Ubuntu. Yang saya benar-benar rasakan berbeda adalah performa. Setelah saya mencoba menggunakan laptop saya dengan intesif, saya belum merasakan perlambatan yang biasanya sudah saya rasakan pada saat menggunakan Ubuntu. :D. Semoga dengan perpidahan ini saya bisa menjadi lebih produktif dari sebelumnya atau minimal saya jadi punya pengalaman dengan sistem operasi yang lain.

[1]:    http://lubuntu.net/
[2]:    https://unity.ubuntu.com/
[3]:    http://www.ubuntu.com/
[4]:    http://www.linux.com/
[5]:    http://mylinuxexplore.blogspot.com/2014/11/ubuntu-1410-vs-kubuntu-1410-vs-xubuntu.html
