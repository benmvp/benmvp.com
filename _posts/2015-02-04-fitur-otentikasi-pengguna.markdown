---
layout: post
title:  "Sistem Otentikasi Pengguna"
date:   2015-02-04 11:57:08
categories: otentikasi pengguna
author: Edwin Lunando
author_t: edwinlunando
permalink: otentikasi-pengguna
description: implementasi fitur otentikasi pengguna
---

Salah satu fitur yang hampir selalu ada di sebuah aplikasi web adalah otentikasi yang memberikan kemampuan pada aplikasi untuk memberikan data yang sesuai dengan kebutuhan pengguna tersebut. Selama ini saya mengembangkan aplikasi, tentunya membuat sistem otentikasi sudah menjadi hal yang biasa. Tetapi, lama kelamaan saya merasa sistem otentikasi menjadi satu hal yang sangat penting. Berikut merupakan implementasi yang menurut saya ideal untuk sistem otentikasi yang aman.

## Identitas Pengguna ##

Identitas pengguna biasanya berbentuk username atau email. Selalu pastikan menyimpan dan membandingkan identitas secara case insentitive, yaitu huruf kecil dan kapital adalah sama. Supaya 'edwin' dengan 'Edwin' merupakan pengguna yang sama agar tidak ada ambigu.

Saat pengguna ingin login, jika pengguna tersebut salah memasukkan sesuatu, selalu gunakan pesan kesalahan yang umum. Jangan menggunakan pesan kesalahan spesifik seperti "password Anda salah" atau "username" tidak terdaftar. Gunakanlah pesan umum seperti **"Kombinasi username dan password tidak ditemukan"**.

## Kata Sandi ##

### Penyimpanan ###

Terkait kata sandi, jangan pernah menyimpan sandi dengan teks langsung. Selalu gunakan fungsi hash yang baik dan terpercaya. Terkait penyimpanan sandi, dapat dilihat lebih jelas di post saya yang sebelumnya terkait metode penyimpanan password.

### Kompleksitas ###

Semakin kompleks sebuah sandi, semakin baik. Sebuah sandi yang simpel atau merupakan kata yang terdapat di kamus, sangat mudah untuk dijebol. Terkait sandi, tentu saja harus case-sensitive. Terkait kompleksitas saya mempunyai beberapa aturan yaitu.

1. Minimal terdiri dari 1 huruf kecil
2. Minimal terdiri dari 1 huruf besar
3. Minimal terdiri dari 1 angka
4. Minimal terdiri dari 1 karakter spesial(optional)

Terkaait dengan pengalaman pengguna, saat pengguna salah memasukan format password, pesan kesalahannya harus memberitahukan semua aturan dari sebuah password, bukan hanya aturan yang kurang saja.

### Panjang Sandi ###

Selalu paksa pengguna untuk menggunakan sandi dengan panjang minimal. Semakin panjang semakin baik. Biasa saya memaksakan untuk minimal 8 panjangnya. Gambar di bawah bisa lebih merepresentasikan pentingnya panjang sandi. Jika sebagai pengguna agak sulit untuk mengingat sandi yang panjang, pertimbangkanlah untuk menggunakan aplikasi manajemen sandi.

![Kata Sandi Menurut Intel][1]

## Mekanisme Lupa Password ##

Tentunya sebuah aplikasi tidak akan lengkap tanpa fitur lupa password. Sebenarnya tidak ada standar yang mengikat terkait fitur ini. Biasanya saya meminta pengguna memasukkan email dan mengirimkan URI untuk mengganti sandi pengguna tersebut. Jangan lupa untuk menonaktifkan URI tersebut setelah beberapa waktu(1 atau 2 jam) atau saat user sudah berhasil mengganti sandi mereka melalui URI tersebut

## Masuk melalui HTTPS ##

Selalu enkripsi koneksi antara pengguna dengan aplikasi saat memasukan data yang sensitif seperti sandi. Jika tidak, orang lain akan mudah melihat data anda yang dikirimkan ke aplikasi. Terutama di tempat yang internetnya terbuka dengan bebas dengan koneksi yang tidak terenkripsi. Sertifikat SSL tidak terlalu mahal kok, sekitar 1 jutaan / tahun.

## Otentikasi Ulang Untuk Data Sensitif ##

Untuk saat melakukan aksi yang sensitif seperti misalnya melakukan penggantian sandi. Seminimal mungkin, minta pengguna untuk memasukkan sandi lagi. Bisa juga dengan mekanisme lain seperti pertanyaan personal atau metode lain.

## Batasi Jumlah Percobaan Login ##

Selalu batasi jumlah percobaan login dalam beberapa waktu untuk mencegah penyerangan secara brute force. Biasanya saya membatasi 10 kali dalam waktu 30 menit. Jika tidak ada batasan, tentu saya orang lain dapat dengan mudah mencoba terus hingga password yang benar ditemukan.

## Two Factor Authentication ##

Nah, berikut merupakan metode yang menurut saya sangat keren dan elegan dalam otentikasi pengguna. Pertama-tama, pengguna diminta untuk memasukkan identitas dan sandi seperti biasa. Lalu, di tahap kedua, pengguna akan diminta memasukkan kode acak yang sudah dikirimkan dari aplikasi ke email atau ponsel pengguna. Jadi, peretas pun tidak bisa login jika tidak mempunyai akses ke email atau ponsel pengguna. Metode ini pun membuat kita tidak perlu membatasi percobaan login.

Jika sebuah aplikasi mempunyai metode login seperti ini, saya selalu menggunakannya karena memang terbukti jauh lebih aman. Saya sangat merekomendasikan untuk menggunakannya kepada setiap orang, terutama aplikasi yang penting seperti email. Sampai tulisan ini dibuat, saya sudah menggunakannya ke Gmail, Twitter, dan Dropbox.

## Kesimpulan ##

Tentunya, masih banyak lagi hal yang perlu dilakukan untuk menyempurnakan metode otentikasi yang sederhana namun aman. Mengimplementasi semua metode yang saya sebutkan memang membutuhkan waktu yang cukup lama, tapi semakin besarnya sebuah aplikasi, tentunya membutuhkan keamanan yang berkelas juga. Saya akan menuliskannya lagi jika saya metode lain yang dapat menyempurnakan sistem otentikasi pengguna. Terima kasih. Semoga membantu. :)

[1]:    http://i.imgur.com/XuMUU0b.gif
