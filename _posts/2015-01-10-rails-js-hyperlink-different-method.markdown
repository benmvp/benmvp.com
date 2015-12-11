---
layout: post
title:  "Metode Lain Pada Hyperlink: jQuery-ujs"
date:   2015-01-10 11:57:08
categories: hyperlink metode
author: Edwin Lunando
author_t: edwinlunando
permalink: metode-lain-hyperlink
description: menggunakan metode HTTP lain pada anchor
---

Akhir-akhir ini saya mencari sebuah solusi dari permasalahan pemrograman web yang sudah saya rasakan sejak dari dulu. Yaitu, sebuah hyperlink tidak dapat mengarahkan user ke halaman yang lain dengan [HTTP method][1] selain GET. Permasalahan ini saya hadapi semenjak saya ingin membuat sebuah aplikasi web yang [REST-ful][2]. Misalkan, saya ingin URI `/post/5/delete` itu bertujuan untuk menghapus model post. Kalau menurut aturan semantik HTTP, request yang mengubah data tidak boleh menggunakan method GET. Dalam kasus ini, saya ingin menggunakan metode DELETE. Berikut contoh implementasi standarnya.

{% highlight html %}
<form action="/post/5/delete" method="post">
    <button type="submit">Hapus</button>
</form>
{% endhighlight %}

Atau

{% highlight html %}
<a href="/post/5/delete">Hapus</a>
{% endhighlight %}


Karena pada dasarnya metode HTTP hanya mendukung metode GET dan POST, tentunya dengan menggunakan form atau hyperlink biasa, kita tidak dapat membuat aplikasi web yang REST-ful dengan metode HTTP lain seperti PUT dan DELETE. Metode HTTP lain hanya dapat digunakan jika kita menggunakan XMLHttpRequest atau sering disebut juga dengan [AJAX][3]. Sebenarnya, menggunakan metode POST pun tidak masalah, aplikasi akan tetap berjalan dengan baik, tetapi saya ingin lebih mengikuti arsitektur REST karena menurut saya semantiknya lebih baik.

Setelah saya eksplorasi beberapa metode, pada akhirnya saya mengingat pengalaman saya dalam menggunakan framework [Ruby on Rails][4], framework yang sangat menekankan untuk menggunakan arsitektur REST. Mereka mengembangakan sebuah pustaka javascript bernama [jQuery-ujs][5] yang berguna supaya hyperlink dapat menggunakan metode lain selain GET. YAY! Setelah saya cari, ternyata jQuery-ujs dapat digunakan oleh framework lain secara universal! Uber cool!

Cara penggunaannya pun mudah, saya tinggal menaruh kode untuk menggunakan `rails.js` setelah deklarasi jQuery dan saya bisa langsung mengubah metode HTTP dari hyperlink saya. Berikut contohnya.

{% highlight html %}
<a href="/post/5/delete" data-method="delete">Hapus</a>
{% endhighlight %}

Dan hyperlink itu pun langsung bekerja layaknya metode HTTP DELETE seperti biasa! Keren. :D. Jika kita perlu menaruh [token CSRF][6], kita perlu menaruhnya di `<meta>` tag karena Rails.js akan mengambilnya dari sana. Berikut contohnya.

{% highlight html %}
<meta name="csrf-token" content="hohohohahaha:)">
<meta name="csrf-param" content="csrfmiddlewaretoken">
{% endhighlight %}

Jangan lupa untuk menaruh tag `<meta>` di dalam `<head>`. :D. Dengan adanya jQuery-ujs, kita dapat membuat aplikasi yang REST-ful dengan tenang dan asik. Arsitektur REST-ful bukan milik API doang kok. :). Selamat mencoba.

[1]:    http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods
[2]:    http://en.wikipedia.org/wiki/Representational_state_transfer
[3]:    http://en.wikipedia.org/wiki/Ajax_%28programming%29
[4]:    http://rubyonrails.org/
[5]:    https://github.com/rails/jquery-ujs
[6]:    http://en.wikipedia.org/wiki/Cross-site_request_forgery
