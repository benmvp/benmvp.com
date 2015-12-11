---
layout: post
title:  "Meningkatkan Performa Aplikasi Web dengan Modul Pagespeed"
date:   2014-12-09 11:57:08
categories: aplikasi performa
author: Edwin Lunando
author_t: edwinlunando
permalink: pagespeed
description: modul pagespeen mempercepat performa aplikasi web
---

Beberapa waktu ini, saya suka meneksplorasi cara meningkatkan performa aplikasi web yang saya buat. Walapun saya tahu ada pepatah mengatakan "*premature optimization is the root of all evil*", saya senang membuat aplikasi saya diakses lebih cepat oleh pengguna. Walaupun itu hanya 100 mili detik atau bahkan 10 mili detik. Salah satu kakas yang saya akui berpengaruh besar dalam meningkatkan performa adalah modul [pagespeed][1] untuk web server yang kita gunakan.

Modul pagespeed dapat diinstal di web server Nginx and Apache. Untuk pengguna Apache, Anda dapat langsung menginstalnya sesuai dengan instruksi, namun, untuk pengguna Nginx harus melakukan kompilasi ulang Nginx. Berikut kode konfigurasi yang saya gunakan untuk mengkompilasi Nginx dengan modul pagespeed.

{% highlight bash %}
--prefix=/usr/share/nginx \
--conf-path=/etc/nginx/nginx.conf \
--http-log-path=/var/log/nginx/access.log \
--error-log-path=/var/log/nginx/error.log \
--lock-path=/var/lock/nginx.lock \
--pid-path=/run/nginx.pid \
--http-client-body-temp-path=/var/lib/nginx/body \
--http-fastcgi-temp-path=/var/lib/nginx/fastcgi \
--http-proxy-temp-path=/var/lib/nginx/proxy \
--http-scgi-temp-path=/var/lib/nginx/scgi \
--http-uwsgi-temp-path=/var/lib/nginx/uwsgi \
--with-debug \
--with-pcre-jit \
--with-ipv6 \
--with-http_ssl_module \
--with-http_stub_status_module \
--with-http_realip_module \
--with-http_addition_module \
--with-http_dav_module \
--with-http_geoip_module \
--with-http_gzip_static_module \
--with-http_image_filter_module \
--with-http_spdy_module \
--with-http_sub_module \
--with-http_xslt_module \
--with-mail \
--with-mail_ssl_module \
--add-module=$HOME/Downloads/ngx_pagespeed \
{% endhighlight %}

Setelah instalasi modul selesai, kita dapat langsung menggunakan modulnya dengan beberapa konfigurasi. Berikut konfigurasi yang saya gunakan pada Nginx untuk aplikasi saya.

    pagespeed on;

    # Wajib ada dan harus bisa ditulis
    pagespeed FileCachePath /var/ngx_pagespeed_cache;
    # Tipe filter
    pagespeed RewriteLevel CoreFilters;
    # Filter tambahan yang tidak ada di paket CoreFilters
    pagespeed EnableFilters prioritize_critical_css,sprite_images;

    # Menggunakan statistik untuk melihat efektivitas
    pagespeed Statistics on;
    pagespeed StatisticsLogging on;
    pagespeed LogDir /var/log/pagespeed;
    pagespeed AdminPath /pagespeed_admin;

Anda bisa memilih filter-filter yang digunakan sebagai metode optimasi selengkapnya di [sini][2]. Berikut merupakan beberapa filter yang saya suka.

1. `prioritize_critical_css`. Filter ini membuat server hanya perlu mengirimkan CSS yang digunakan oleh halaman tersebut. Sangat berguna jika aplikasi tersebut menggunakan 1 file CSS monolitik yang besar.
2. `rewrite_images`. Filter ini membuat berkas-berkas gambar yang besar dioptimasi supaya ukurannya lebih kecil dengan kualitas yang baik.
3. `convert_jpeg_to_webp`. Filter ini akan mengubah format gambar menjadi webp pada browser yang mendukungnya secara otomatis.

Pertama kali saya mengaktifkan page pada aplikasi saya, saya langsung melihat pengurangan jumlah total data yang signifikan. Beberapa aplikasi yang memang sudah saya optimasi sebelumnya bisa hemat sekitar 100 - 300 KiloByte. Pada aplikasi yang belum dioptimasi, bahkan bisa hemat lebih dari 1 MegaByte tergantung jumlah berkas statis yang terdapat di aplikasi tersebut. Mantap!

Dari pengurangan data yang ditransfer, sudah dapat dilihat bahwa akan ada peningkatan performa dari sisi pengguna. Lalu, saya mulai mengecek apakah modul tersebut melakukan proses yang dapat mengurangi performa. Ternyata tidak. Setiap metode optimasi yang dilakukan langsung disimpan pada cache sehingga tidak perlu memproses berkas yang sama setiap kali ada permintaan. Keren parah.

Satu hal penting yang membuat saya senang dengan menggunakan modul pagespeed adalah saya tidak perlu melakukan optimasi terhadap berkas statis seperti berkas gambar, javascript, dan css dari sisi aplikasi lagi. Saya hanya perlu menginstal modul pagespeed dan melakukan sedikit konfigurasi. Simpel, efektif, dan berguna. Selamat mencoba! :D

[1]:    https://developers.google.com/speed/pagespeed/module
[2]:    https://developers.google.com/speed/pagespeed/module/config_filters
