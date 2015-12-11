---
layout: post
title:  "Emmet: Cara Cepat dan Tepat Menulis HTML"
date:   2015-03-12 11:57:08
categories: html emmet
author: Edwin Lunando
author_t: edwinlunando
permalink: emmet
description: penggunaan emmet untuk menulis HTML dengan cepat dan tepat
---

Jika kamu seorang pengembang web, pastinya kamu akan menemui bahasa [HTML][2] dengan sangat sering. Setiap elemen yang kita buat pada halaman situs kita, pasti berhubungan dengan HTML. Lama-lama saya merasa sangat bosan karena menulis sesuatu yang berulang-ulang. Setiap elemen HTML, saya harus menulis tag pembuka dan penutupnya. Padahal, pada satu halaman saja bisa terdapat ratusan tag HTML yang perlu kita tulis. Membanyangkannya saja capek. XD.

Untungnya, beberapa tahun yang lalu(sebelum saya mengenal HTML), ada sejumlah orang yang merasakan kebosanan yang sama dengan saya yang sekarang. Oleh karena itu, dibentuklah [emmet][1]. Kakas yang diperuntukan untuk menulis tag HTML dengan cepat dan tepat. Emmet ini terdapat di banyak *text editor* atau IDE populer sebagai plugin. Berikut beberapa kasus yang sering saya temui dalam penggunaan emmet.

Penggunaan emmet pun sangatlah mudah. Kita hanya perlu menulis nama tag HTML-nya lalu menekan tab. berikut contoh saat saya ingin membuat sebuah tautan([anchor][3]).

{% highlight html %}

a

{% endhighlight %}

Lalu, tekan tab. Hasilnya adalah.

{% highlight html %}

<a href=""></a>

{% endhighlight %}

## Membuat <div> baru ##

Saya ingin membuat <div> baru dengan class `row`. Berikut versi emmet-nya.

{% highlight html %}

.row

{% endhighlight %}

`.` digunakan untuk mendefinisikan kelas dari elemen HTML tersebut. gunakan `#` jika ingin mendefinisikan id.Jika saya menekan `tab`, maka hasilnya adalah

{% highlight html %}

<div class="row"></div>

{% endhighlight %}

## Tag Bersarang ##

Kasus lain yaitu membuat <div> yang bersarang.

{% highlight html %}

.row>.col-md-12

{% endhighlight %}

Tekan tab.

{% highlight html %}

<div class="row">
    <div class="col-md-12"></div>
</div>

{% endhighlight %}

## Penambahan ##

Untuk menambahkan tag di lokasi yang selevel, gunakan operator `+`.

{% highlight html %}

.row+.row

{% endhighlight %}

Menghasilkan.

{% highlight html %}

<div class="row"></div>
<div class="row"></div>

{% endhighlight %}

## Multiplikasi ##

Dengan operator `*` kita dapat mendefinisikan beberapa elemen sekaligus.

{% highlight html %}

.row>.col-md-4*3

{% endhighlight %}

Kasus di atas, saya ingin membuat 3 <div> dengan kelas `col-md-4`.

{% highlight html %}

<div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4"></div>
    <div class="col-md-4"></div>
</div>

{% endhighlight %}

Saya biasanya menggunakan fitur multiplikasi ini pada [list][6].

{% highlight html %}

ul.list-unstyled>li*3

{% endhighlight %}

Berikut hasilnya.

{% highlight html %}

<ul class="list-unstyled">
    <li></li>
    <li></li>
    <li></li>
</ul>

{% endhighlight %}

## Urutan Angka ##

Biasanya pada elemen yang jumlahnya banyak, kita ingin memisahkannya dengan id yang berbeda. Emmet dapat menuliskan urutan angka secara otomatis.

{% highlight html %}

ul.list-unstyled>li#item$*3

{% endhighlight %}

Hasilnya.

{% highlight html %}

<ul class="list-unstyled">
    <li id="item1"></li>
    <li id="item2"></li>
    <li id="item3"></li>
</ul>

{% endhighlight %}

## Pengelompokan ##

Dannnn. Yang terakhir adalah pengelompokan. Biasanya saya gunakan untuk menulis [description list][5]. Pengelompokan sama gunanya dengan tanda kurung pada matematika. Jika digabung dengan operator multiplikasi, maka semua elemen pada kelompok tersebut dikali.

{% highlight html %}

dl.dl-horizontal>(dt+dd)*3

{% endhighlight %}

Menghasilkan.

{% highlight html %}

<dl class="dl-horizontal">
    <dt></dt>
    <dd></dd>
    <dt></dt>
    <dd></dd>
    <dt></dt>
    <dd></dd>
</dl>

{% endhighlight %}

Keren, bukan? Setelah menggunakan emmet, nulis HTML jadi seru. Segera coba gunakan emmet dan rasakan peningkatan produktivitasnya. Yang saya bagikan hanyalah sebagian kecil dari fitur emmet, coba kunjungi [contekan ini][4] untuk melihat fitur emmet dengan lengkap. :)

[1]:    http://emmet.io/
[2]:    https://developer.mozilla.org/en-US/docs/Web/HTML
[3]:    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
[4]:    http://docs.emmet.io/cheat-sheet/
[5]:    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl
[6]:    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul
