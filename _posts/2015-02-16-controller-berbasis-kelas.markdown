---
layout: post
title:  "Controller Berbasis Kelas"
date:   2015-02-16 11:57:08
categories: mvc kelas
author: Edwin Lunando
author_t: edwinlunando
permalink: controller-berbasis-kelas
description: controller berbasis kelas
---

Dalam sebuah web framework, sistem model view controller(MVC) sudah menjadi arsitektur standar yang digunakan hampir di semua framework yang saya gunakan. Model digunakan untuk mengatur sumber data yang digunakan oleh aplikasi, view untuk menghasilkan template HTML, dan controller adalah bagian yang menyatukan keduanya. Mayoritas dari framework menggunakan controller yang implementasinya berupa kelas namun, tidak banyak yang benar-benar menggunakan fitur-fitur dari pemrograman beorientasi objek(OOP). Berikut merupakan implementasi standar controller di Laravel.

{% highlight php startinline %}

class UsersController extends BaseController {
    ...

    public function index()
    {
        // ambil semua pengguna dari basis data
        $users = User::all();
        // mengambil view dan memberikan data pengguna
        return View::make('users.index')->with('users', $users);
    }
}
{% endhighlight %}

Terlihat memang controller tersebut mengimplementasikan dari sebuah kelas, tetapi, saya rasa **kode yang di dalamnya tetap berkesan prosedural**. Yaitu, di fungsi `index()` terdapat kode berurutan. Nyatanya, mayoritas web framework menggunakan arsitektur seperti controller di atas. Sekarang, saya ingin membahas implementasi controller yang lebih "berkelas" atau lebih menggunakan teknik pemrograman berorientasi objek.

Salah satu fitur yang web framework Django adalah controller berbasis kelas yang benar-benar menggunakan kaidah OOP yang sangat mendalam. Berikut contohnya.

{% highlight python %}

class UserListView(ListView):
    template_name = "users/index.html"
    model = User

{% endhighlight %}

Di kamus web framework Django, **view merupakan controller** dan controller Django di atas menghasilkan respon yang sama persis dengan kode controller Laravel dengan kode yang lebih singkat dan lebih "OOP". Singkatnya, Django menyediakan banyak kelas generik dibungkus dalam kelas yang mengimplementasikan fitur-fitur standar yang sering digunakan saat mengembangkan aplikasi web. Jadi, saat kita membutuhkannya, kita tinggal mewarisi(inherit) salah satu kelas yang dibutuhkan dan jika kita membutuhkan kustomisasi, kita tinggal mendefinisikan ulang fungsi dari kelas dasarnya, lalu memanggil kelas orang tuanya. Berikut contohnya.

{% highlight python %}

class UserListView(ListView):
    template_name = "users/index.html"
    model = User

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_admin():  # Cek apakah user seorang admin
            messages.error(request, "Anda tidak dapat mengakses halaman ini")
            return redirect('/')   # Kembali ke halaman home
        # Panggil kelas orang tua
        return super(UserListView, self).dispatch(request, *args, **kwargs)

{% endhighlight %}

`dispatch` merupakan fungsi yang pertama kali dipanggil saat menggunakan `ListView`. Kita dapat melakukan pengecekan izin terhadap user yang mengakses halaman tersebut di dalam fungsi tersebut.

Berikut struktur standar dari controller biasa jika kita ingin membuat sebuah halaman kontak yang mempunyai form dan ingin menangani saat form tersebut di-submit.

{% highlight python %}
if request == GET
    # kirim template form sederhana.
    return view('contact.form')
else if request == POST
    if form.valid
        # jika validasi form benar. kode bebas tergantung aplikasi.
    else
        # jika validasi form salah, kirim ulang halaman form beserta pesan.kesalahan
        return view('contact.form')
{% endhighlight %}

Salah satu controller kelas di Django yang sering saya gunakan adalah `FormView`.

{% highlight python %}

class ContactView(FormView):
    template_name = 'contact.html'  # template halaman form
    form_class = ContactForm  # Form yang digunakan
    success_url = '/thanks/'  # Halaman setelah validasi form selesai

    def form_valid(self, form):
        # kode aplikasi bebas
        form.send_email()
        return super(ContactView, self).form_valid(form)

{% endhighlight %}

Pada aplikasi biasa, kode yang biasanya berbeda hanyalah kode setelah validasi form itu benar. Sisanya seperti kirim template form dan validasi saat form salah itu sebenarnya **kode generik yang bisa diselesaikan dengan OOP**.

Kelas `FormView` merupakan kelas yang berguna untuk menyediakan halaman yang mempunyai sebuah form untuk input dari user, dalam kasus kode di atas merupakan form kontak, dan controller yang menangani saat form tersebut di-submit(POST). Jadi, dengan menggunakan `FormView`, **kita hanya perlu mengimplementasi kode setelah validasi form benar saja**, sisanya sudah ditangani langsung secara generik.

Pendapat pribadi saya, saya sangat senang dengan menggunakan controller berbasih kelas yang generik. Saya hanya perlu mewarisi kelas tersebut dan mengubah (biasanya) sedikit sesuai dengan kebutuhan aplikasi saya. Terima kasih, tetap produktif dan bahagia. :)
