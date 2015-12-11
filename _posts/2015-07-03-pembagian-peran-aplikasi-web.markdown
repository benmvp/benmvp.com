---
layout: post
title:  "Pembagian Peran Dalam Pengembangan Aplikasi Web"
date:   2015-07-03 11:57:08
categories: peran aplikasi-web
author: Edwin Lunando
author_t: edwinlunando
permalink: pembagian-peran-aplikasi-web
description: pembagian peran dalam mengembangkan aplikasi web
---

Sebagai seorang yang bekerja di bidang teknis, salah satu tugas yang menurut saya cukup menantang adalah mengkomunikasikan hal teknis kenapa orang non-teknis, contohnya adalah manajer proyek saya atau bahkan rekan kerja yang berada di divisi lain. Pertanyaan-pertanyaan seperti, mengapa ada front-end dan back-end dalam pengembangan web? Kenapa satu fitur ini sulit diimplementasikan? Gambar berikut mendeskripsikan sulitnya menjawab pertanyaan-pertanyaan tersebut.

![Pembagian Tugas](http://imgs.xkcd.com/comics/tasks.png)

Untuk permulaan, saya akan menjelaskan pembagian tugas dalam pengembangan aplikasi web. Biasanya, dalam aplikasi web terdapat 3 pembagian utama yaitu, desain, front-end(client), dan back-end(server). Mari kita bahas satu per satu.

## Desain

Sebuah aplikasi yang baik, tentunya mempunyai desain yang baik juga. Biasanya yang bertugas dalam hal desain ini disebut dengan desainer. Kenapa sebuah aplikasi membutuhkan desainer? Jika Anda tidak mau website Anda tampak seperti ini.

![Website Jelek](http://makeitwealthy.com/wp-content/uploads/2015/03/low-price-skates.jpg)

Anda sebaiknya menggunakan jasa desainer #lebay. Mendesain aplikasi web tentunya berbeda dengan mendesain poster ataupun desain grafis lainnya karena ada elemen-elemen desain yang dapat menentukan **interaksi** pengguna dengan aplikasinya. Contohnya seperti sebuah tombol, dalam aplikasi web, belum tentu pindah ke halaman yang lain(yang biasanya terdapat pada *single page application*([SPA][0])). Pengalaman saya bekerja dengan desainer yang awalnya bekerja di bidang desain grafis, secara desain, sudah enak dipandang dengan mata, tetapi biasanya interaksinya seperti halaman statis yang semua link atau button pindah ke halaman lain.

Terkait dengan tren desain, aplikasi jaman sekarang memiliki kecenderungan dengan desain yang sederhana. Tidak banyak warna ataupun dekorasi-dekorasi yang bersifat menuh-menuhin tempat. Ruang kosong termasuk dengan elemen desain yang sangat penting. Intinya adalah, desain aplikasi web sama dengan mendesain pengalaman atau interaksi pengguna dengan sebuah aplikasi. Hasil dari pekerjaan desainer biasa merupakan berkas-berkas yang mempunyai ekstensi `jpg`, `png`, `psd`, `ai`, atau `cdr`. Tidak terkecuali berkas yang dapat merepresentasikan tampak visual dari aplikasi tersebut.

## Front End

Setelah desain selesai, hasil pekerjaan desainer dilanjutkan kepada front-end engineer. Kalau desainer yang membuat blueprint dari sebuah robot, front-end merupakan proses pembuatan fisik dari robot tersebut. Tugas dari front-end ini adalah mentranslasikan hasil desain menjadi kode yang nantinya akan dibaca oleh browser dan tampil di browser sesuai dengan hasil desain. Berikut contoh kode yang ditulis oleh front-end.

{% highlight html %}

<!DOCTYPE html>
<html>
<body>

<h1>Judul Halaman</h1>

<p>Konten Halaman</p>

</body>
</html>


{% endhighlight %}

Halaman di atas tentunya sangat sederhana. Sebuah aplikasi yang sudah jadi, bisa saja memuat ribuan bahkan puluh ribuan baris kode. Front-end developer juga bertanggung jawab mengimplementasikan komponen-komponen interaksi yang sudah didesain. Komponen standar yang terdapat di web adalah fonts, drop-down menus, buttons, transitions, sliders, contact forms, dan masih banyak yang lain.

Hasil pekerjaan front-end ada tiga jenis berkas yaitu HTML(hyper text markup language) untuk stuktur dan konten, javascript untuk interaksi elemen, dan CSS(cascading style sheet) untuk tema dan warna. Anda bisa langsung melihat hasil kode yang terdapat di setiap halaman browser Anda dengan memilih opsi *view page source*.

Ada beberapa kubu lain yang menganggap desain adalah bagian dari front-end juga karena *web designer* itu biasanya bisa desain dan frontend sekaligus.

## Back End

Setelah bentuk fisik dari aplikasi web(robot) jadi, selanjutnya tugas back-end yang membuat fisik tersebut menjadi hidup. Tugas back-end adalah menyambungkan fisik-fisik halaman web tersebut dengan data dan logika yang membuat antar komponen aplikasi terhubung menjadi satu aplikasi.

Back-end developer biasanya dapat dibagi menjadi 3 bagian yaitu, server(komputer fisik yang menyediakan tempat untuk aplikasi), aplikasi, dan basis data(tempat aplikasi menyimpan data). Teknologi(bahasa pemrograman) yang biasa digunakan untuk mengembangkan aplikasi web adalah PHP, Ruby, Python, Java, dan C#. Untuk memudahkan pengembangan, mayoritas developer menggunakan framework(kode kerangka aplikasi) yang memudahkan pengembangan aplikasi web. Sama saja seperti kalau mau menulis, kalau sudah ada kerangka karangannya, menulis menjadi jauh lebih cepat dan mudah.

Untuk basisdata, Anda bisa membayangkan tabel-tabel yang terdapat di excel. Data-data kami simpan dalam bentuk baris di tabel tersebut. Walaupun terdapat banyak metode penyimpanan yang lain selain dalam tabel, ini merupakan metode yang paling umum dalam aplikasi web.

Tujuan utama saya dalam menulis topik ini adalah sebagai referensi jika ada yang membutuhkan pencerahan terkait pembagian tugas dalam pengembangan web. Semoga membantu! :)

[0]:    https://en.wikipedia.org/wiki/Single-page_application
