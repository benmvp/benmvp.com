---
layout: post
title:  "Pengatur Versi Python"
date:   2014-12-27 11:57:08
categories: python version
author: Edwin Lunando
author_t: edwinlunando
permalink: pengatur-versi-python
description: pengatur versi python
---

Pada perkerjaan saya, saya bekerja dengan banyak aplikasi web. Setiap aplikasi web biasanya selalu membutuhkan pustaka yang berbeda-beda dan versi bahasa pemrograman yang berbeda-beda. Dari pengalaman saya, saya pernah diminta untuk manangani yang sudah dikembangkan 2 tahun yang lalu. Tentunya, versi pustaka yang digunakan 2 tahun lalu sudah sangat jauh berbeda dengan sekarang. Oleh karena itu, kakas untuk mengatur versi Python dan kakasnya seperti [virtualenv][1] dan [virtualenvwrapper][2] sangatlah berguna.

virtualenv dikembangkan untuk memfasilitasi beberapa masalah seperti, penggunaan versi Python dan pustaka yang berbeda atau kita tidak mempunyai izin untuk menginstal pustaka pada direktory `site-packages`. Jika Anda mempunyai salah satu dari kedua masalah tersebut, maka virtualenv memang ada untuk Anda. :). Untuk menginstal virtualenv, disarankan untuk menggunakan `pip`.

{% highlight bash %}
pip install virtualenv
{% endhighlight %}

virtualenv membuat instalasi virtual versi Python baru di tempat yang kira tentukan sendiri. Jadi, executable dan direktori pustaka akan ditaruh di tempat lain yang pemilik dan izinnya bisa didefinisikan sendiri. Berikut contoh saat kita ingin membuat lingkungan pengambangan baru.

{% highlight bash %}
virtualenv coba
{% endhighlight %}

Perintah tersebut akan membuat sebuah direktori baru bernama `coba` yang akan berisikan Python dan pustaka-pustaka Python yang diinstal. untuk menggunakannya, jalankan.

{% highlight bash %}
source coba/bin/activate
{% endhighlight %}

Setelah itu, Anda dapat menggunakan Python seperti biasa dengan lingkungan pustaka yang berbeda. Selanjutnya, kita akan membahas virtualenvwrapper. virtualenvwrapper merupakan pustaka pembungkus virtualenv supaya kita tidak perlu mengatur direktori instalasi Python dan pustakanya. Semua instalasi virtual Python baru melalui virtualenvwrapper akan ditaruh di direktory home pengguna tersebut di bawah direktory `.virtualenvs`. Berikut contoh penggunaannya.

{% highlight bash %}
mkvirtualenv coba
{% endhighlight %}

Lalu, untuk menggunakannya.

{% highlight bash %}
workon coba
{% endhighlight %}

Semua menjadi lebih sederhana dan mudah. :D. Kombinasi virtualenv dan virtualenvwrapper menjadi pasangan yang wajib digunakan saat aku ingin mengembangkan proyek baru dengan Python. Jika menggunakan Ruby, saya menggunakan [rvm][3]. Selamat mencoba!

[1]:    https://github.com/pypa/virtualenv
[2]:    https://bitbucket.org/dhellmann/virtualenvwrapper
[3]:    https://rvm.io/
