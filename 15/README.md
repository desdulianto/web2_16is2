# Load balancer

Contoh menggunakan proxy load balancer nginx dengan aplikasi backend
nodejs/expressjs.

## User Guide (debian, ubuntu, mint)

copy nginx-default ke /etc/nginx/sites-available/default
```sh
# cp nginx-default /etc/nginx/sites-available/default
```

jalankan start.sh
```sh
# sh ./start.sh
```

nyalakan atau restart nginx
```sh
# /etc/init.d/nginx restart
```

akses ke port 3000 dengan browser dan perhatikan nomor process yang
berubah-ubah sesuai dengan aplikasi backend yang melayani request user.
