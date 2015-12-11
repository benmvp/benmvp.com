---
layout: post
title:  "Penggunaan .env Sebagai Tempat Penyimpanan Konfigurasi"
date:   2015-06-19 11:57:08
categories: konfigurasi env
author: Edwin Lunando
author_t: edwinlunando
permalink: penggunaan-.env
description: penggunaan .env dalam pengembangan aplikasi
---

Hampir semua aplikasi(terutama web) yang pernah saya kembangkan membutuhkan tempat untuk menaruh konfigurasi-konfigurasi yang dibutuhkan aplikasi untuk berjalan. Konfigurasi yang dimaksud bukanlah setelan yang bisa diganti-ganti dengan mudah oleh pengguna seperti warna atau tema, melainkan konfigurasi pengembangan aplikasi seperti nama basis data yang digunakan, URL basis data, servis eksternal seperti Amazon S3, dan kunci rahasia dari aplikasi tersebut. Berikut contoh konfigurasi basis data pada [Django][0].

{% highlight python %}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'saya_development',
        'USER': 'saya',
        'PASSWORD': 'hohohaha',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

{% endhighlight %}

Permasalahan yang saya temui adalah, dalam mengembangkan aplikasi web, kami mengenal lebih dari satu lingkungan pengembangan. Contohnya yang paling standar itu ada 3, yaitu development, staging, dan production. Ketiga lingkungan tersebut juga tentunya mempunyai konfigurasi yang berbeda satu dengan yang lain. **Selain itu, konfigurasi pada beberapa lingkungan juga seringkali bersifat rahasia**(user, password, url) yang artinya tidak dapat dibagikan atau ditaruh di repository kode([git][1], [mercurial][2], [svn][3], [bazaar][4]). Hal ini penting karena ada begitu banyak orang yang siap menggunakan informasi sensitif Anda untuk kepentingan mereka pribadi. Contohnya dapat dibaca di [artikel ini][9].

Ada banyak pendekatan yang dapat dilakukan untuk menyelesaikan masalah konfigurasi ini. Metode yang menurut saya paling baik adalah dengan menaruhnya di [environment variable][5] yang ditaruh di berkas `.env`. Variabel tersebut tentunya dapat dibedakan tiap mesin sehingga dapat digunakan. Berikut contohnya.

{% highlight bash %}
DEV_DB_NAME=saya_development
DEV_DB_USER=saya
DEV_DB_PASS=hohohaha
DEV_DB_HOST=localhost
DEV_DB_PORT=3306
{% endhighlight %}

Berkas `.env` ini diletakkan di `root`(direktori paling atas) folder dari proyek. Jika kita membutuhkan nilainya, kita dapat langsung mengambil dari berkas tersebut. Berikut contoh penggunaannya dalam proyek Django. Dalam kasus ini, saya menggunakan pustaka [django-getenv][6] dan [django-getenv][7] untuk mengambil nilai dari berkas `.env`. Pada umumnya, sudah ada yang membuat pustaka untuk membaca berkas `.env` untuk setiap macam proyek atau framework. Jika tidak ada, cara membuatnya cukup mudah. Anda hanya perlu membaca sebuah berkas, lalu menguraikannya berdasarkan `=` dan masukan variabel tersebut pada `environment variable` mesin tersebut.

{% highlight python %}
from getenv import env

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': env("DEV_DB_NAME", "b_development"),
        'USER': env("DEV_DB_USER", "root"),
        'PASSWORD': env("DEV_DB_PASS", ""),
        'HOST': env("DEV_DB_HOST", ""),
        'PORT': env("DEV_DB_PORT", ""),
    }
}
{% endhighlight %}

**Jangan lupa untuk menyisihkan berkas `.env` ini dari repository kode Anda**. Jika Anda menggunakan git, taruhlah `.env` ini di dalam `.gitignore`. Metode ini juga sudah dijadikan standar dalam pengembangan aplikasi web yang baik oleh situs [12factor.net][8] ini. Silahkan dicoba dan rasakan nikmatnya mengatur konfigurasi dengan rapi.

[0]:    https://www.djangoproject.com/
[1]:    https://git-scm.com/
[2]:    https://mercurial.selenic.com/
[3]:    https://subversion.apache.org/
[4]:    http://bazaar.canonical.com/en/
[5]:    https://en.wikipedia.org/wiki/Environment_variable
[6]:    https://pypi.python.org/pypi/django-getenv/
[7]:    https://pypi.python.org/pypi/django-dotenv/
[8]:    http://12factor.net/config
[9]:    http://www.devfactor.net/2014/12/30/2375-amazon-mistake/

