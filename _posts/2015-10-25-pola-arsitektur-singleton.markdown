---
layout: post
title:  "Pola Desain: Singleton"
date:   2015-10-25 11:57:08
categories: pola arsitektur singleton
author: Edwin Lunando
author_t: edwinlunando
permalink: singleton
description: desain singleton
header_image: /images/singleton_pattern.png
---

Dalam dunia rekayasa perangkat lunak, *singleton* adalah sebuah pola desain(*design pattern*) kode yang membatasi sebuah kelas hanya boleh menginstansiasi sebuah objek saja. Pola desain adalah solusi umum yang diperuntukkan untuk mengatasi masalah-masalah umum yang di dunia perangkat lunak. Pola desain *singleton* biasanya untuk sebuah objek yang digunakan di seluruh bagian sistem. Istilah *singleton* diambil dari [istilah matematika][0] yang berarti sebuah set yang mempunyai tepat satu elemen.

Salah satu hal yang perlu diperhatikan dalam mengimplementasikan pola *singleton* adalah akses terhadap resource yang digunakan oleh kelas *singleton* itu. Karena kelas *singleton* dapat dipanggil bersamaan dari beberapa tempat sekaligus, sangat mungkin terjadi [race condition][2]. Pada saat mengimplementasikan *singleton* perlu diketahui semua aksi yang dilakukan oleh kelas tersebut harus [thread safe][1], bahkan saat menginstansiasikan objek untuk pertama kalinya. Kalau Anda menggunakan pustaka yang menggunakan pola *singleton*, Anda harus memastikan kalau pustaka tersebut thread safe agar tidak terjadi hal yang aneh dalam aplikasi Anda.

Salah satu bagian dari perangkat lunak yang biasanya diimplementasikan dengan *singleton* adalah [logfile][3]. Logging merupakan contoh y ang sempurna untuk *singleton* karena aplikasi tidak ada berubah sama sekali walaupun sebuah log jalan atau tidak. Yang lebih penting lagi, tidak ada informasi yang mengalir dari log ke aplikasi. Informasi hanya mengalir dari aplikasi ke log untuk menulis riwayat kerja aplikasi. Contoh lain dari penggunakan *singleton* adalah kelas yang menyimpan konfigurasi aplikasi secara global.

Berikut merupakan beberapa implementasi pola *singleton* di beberapa bahasa.

## Java

{% highlight java %}
package com.edwinlunando.singletons;

public class Singleton {

  private static Singleton instance = null;

  protected Singleton() {
  }

  // Lazy Initialization (If required then only)
  public static Singleton getInstance() {
    if (instance == null) {
      // Thread Safe. Might be costly operation in some case
      synchronized (Singleton.class) {
        if (instance == null) {
          instance = new Singleton();
        }
      }
    }
    return instance;
  }
}
{% endhighlight %}
`synchronized` digunakan untuk memastikan kalau hanya ada satu objek yang diinstansiasi oleh kelas `Singleton`

## Python
{% highlight python %}
class Singleton:

  class __Singleton:
    def __init__(self, arg):
      self.val = arg
    def __str__(self):
      return repr(self) + self.val

  instance = None

  def __init__(self, arg):
    if not Singleton.instance:
      Singleton.instance = Singleton.__Singleton(arg)
    else:
      Singleton.instance.val = arg

  def __getattr__(self, name):
    return getattr(self.instance, name)
{% endhighlight %}

Banyak cara lain untuk meng-implementasikan singleton pada Python yaitu dengan mengguakan *decorator* atau *metaclass*.

## Ruby
{% highlight ruby %}
class Singleton
  def initialize
    @log = 'TEST'
  end

  @@instance = Singleton.new

  def self.instance
    return @@instance
  end

  private_class_method :new
end
{% endhighlight %}

## PHP
{% highlight php startinline %}
class User
{
    // Hold an instance of the class
    private static $instance;

    // The singleton method
    public static function singleton()
    {
        if (!isset(self::$instance)) {
            self::$instance = new __CLASS__;
        }
        return self::$instance;
    }

}
{% endhighlight %}

Perlu diketahui bahwa pola *singleton* untuk tidak digunakan sembarangan karena kegunaannya hanya di beberapa kasus tertentu. Saya akan membahas penggunakan pola desain kode yang lain untuk mengatasi masalah umum yang lain juga. Terima kasih!

[0]:    https://en.wikipedia.org/wiki/Singleton_(mathematics)
[1]:    https://en.wikipedia.org/wiki/Thread_safety
[2]:    https://en.wikipedia.org/wiki/Race_condition
[3]:    https://en.wikipedia.org/wiki/Logfile
