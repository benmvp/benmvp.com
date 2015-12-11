---
layout: post
title:  "Rapihkan Kode: Referensi Daripada Nilai Langsung"
date:   2015-03-29 11:57:08
categories: kode rapi
author: Edwin Lunando
author_t: edwinlunando
permalink: referensi-daripada-nilai-langsung
description: referensi daripada nilai langsung
---

Baru-baru ini saya mendapat kesempatan untuk membahas beberapa hal teknis bersama teman saya yang jago ngoding juga. Kalau bertemu dengan dia, kami selalu membahas implementasi dari aplikasi-aplikasi yang sudah kami buat sebelumnya. Kami melakukan ini untuk saling mengoreksi satu sama lain. Pada saat itu, saya melihat sebuah kekurangan yang sangat fatal dalam kodenya yaitu, dia selalu menggunakan nilai langsung daripada referensi pada saat menggunakan nilai. Berikut contohnya dalam bahasa [Python][1]. (ilustrasi, bukan kode asli)

{% highlight python %}

# program hitung luas persegi panjang
print 'hitung luas = ' +  str(5 * 10)

# program hitung luas segitiga dari persegi panjang tersebut
print 'hitung segitiga dalam = ' + str(5 * 10 / 2)

{% endhighlight %}

Program di atas berjalan dengan benar dan mudah untuk dibaca, tetapi untuk jangka panjang, kode tersebut merupakan kode yang berbahaya karena menggunakan nilai langsung. Berikut contoh kode yang menggunakan referensi variabel.

{% highlight python %}

panjang = 5
lebar   = 10
PEMBAGI_SEGITIGA = 2

# program hitung luas persegi panjang
print 'hitung luas = ' +  str(panjang * lebar)

# program hitung luas segitiga dari persegi panjang tersebut
print 'hitung segitiga dalam = ' + str(panjang * lebar / PEMBAGI_SEGITIGA)

{% endhighlight %}

Program di atas menghasilkan keluaran yang sama persis dengan kode yang sebelumnya, tetapi, kode yang kedua lebih rapi daripada yang pertama karena menggunakan referensi variabel dalam memproses nilai panjang dan lebarnya. Kenapa bisa disebut lebih rapi? Karena, jika program tersebut dikembangkan lebih lanjut, dengan menggunakan nilai yang sama dan kita mau mengubah nilai panjang dan lebar tersebut, tentunya lebih repot menangani kode yang pertama karena kita perlu mengubah nilai dari setiap penggunaannya. Berikut contohnya.

{% highlight python %}

# program hitung luas persegi panjang
print 'hitung luas = ' +  str(7 * 15)

# program hitung luas segitiga dari persegi panjang tersebut
print 'hitung segitiga dalam = ' + str(7 * 15 / 2)

# program hitung luar lingkaran dari panjang persegi panjang
print 'hitung luas lingkaran = ' + str(3.14 * 7 * 7)

{% endhighlight %}

Sedangkan, mari kita bandingkan dengan kode yang menggunakan referensi variabel.

{% highlight python %}

panjang = 7
lebar   = 15
PEMBAGI_SEGITIGA = 2
PI = 22/7

# program hitung luas persegi panjang
print 'hitung luas = ' +  str(panjang * lebar)

# program hitung luas segitiga dari persegi panjang tersebut
print 'hitung segitiga dalam = ' + str(panjang * lebar / PEMBAGI_SEGITIGA)

# program hitung luar lingkaran dari panjang persegi panjang
print 'hitung luas lingkaran = ' + str(PI * panjang * panjang)

{% endhighlight %}

Kita hanya perlu mengubah nilai dari variabel tersebut! Sangat efisien bukan? Bayangkan jika kode yang kita tulis itu menggunakan nilai langsung dan nilai tersebut banyak digunakan di program kita. Lalu, suatu saat, kita perlu mengubah nilai tersebut. :)). Kesalahan tersebut biasanya banyak ditemui terutama dalam penggunakan nilai yang berupa konstanta. Selain lebih rapi, **performa aplikasi juga akan menjadi lebih baik karena program tidak perlu membuat obyek nilai tersebut yang memakan pemrosesan lagi**.

Walaupun terkadang merapihkan kode dari yang menggunakan nilai langsung menjadi referensi itu melelahkan, manfaatnya akan sangat dirasakan di masa depan, terutama jika kita membuat sebuah produk atau program yang akan dikembangkan terus di masa depan. :). Aturan emasnya adalah, **setiap nilai yang digunakan, harus direpresentasikan dengan sebuah referensi**. Jadi, mulailah menulis kode yang rapi!. :D


[1]:    https://www.python.org/
