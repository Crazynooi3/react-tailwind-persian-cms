# 🇮🇷 Persian CMS - React + Tailwind

یک **CMS ساده و فارسی** که با **React** و **TailwindCSS** ساخته شده است.  
سمت سرور از **Node.js** استفاده شده و تمامی عملیات‌های CRUD پیاده‌سازی شده‌اند.  
نسخه دسکتاپ کامل‌تر است ولی برای گوشی هم بهینه‌سازی شده (هرچند هنوز بعضی صفحات ناقص هستند).

---

## ✨ ویژگی‌ها

- طراحی مدرن و واکنش‌گرا با **TailwindCSS**
- مدیریت خطا برای ورودی‌ها
- نوتیفیکیشن‌های کاربر پسند با **Toast**
- ساختار چند صفحه‌ای و قابل توسعه
- نمایش داده‌ها با **Recharts**
- لودینگ مناسب هنگام تغییر سایز یا حالت نمایش
- زبان کامل فارسی و راست‌چین

---

## 📸 دموی پروژه

<div align="center">
<img src="[https://github.com/Crazynooi3/react-tailwind-persian-cms/public/images/DemoImage.png](https://github.com/Crazynooi3/react-tailwind-persian-cms/blob/main/public/images/DemoImage.png)" alt="Persian CMS Demo" width="600">
</div>

---

## 🚀 راه‌اندازی پروژه

برای اجرای پروژه مراحل زیر را دنبال کنید:

1. 📥 کلون کردن ریپو

```bash
git clone https://github.com/Crazynooi3/react-tailwind-persian-cms
```

2. 📦 نصب پکیج‌ها

```bash
npm install
```

3. ▶️ اجرای سرور
   من برای اجرای دیتابیس روی لوکال هاست از XAMPP استفاده کردم و سرور NodeJs هم روی پورت ۸۰۰۰ اجرا کردم. وارد پوشه Backend بشین فایل Server.js رو اجرا کنید

```bash
node server.js
```
4. ▶️ اجرای پروژه
   پروژه با Vite نوشته شده و تست گرفته شده. پس برای اجرا به Root برگردین و vite رو اجرا کنید.
   
```bash
npm run dev
```

نکته مهم : فایل دیتابیس در روت پروژه قرار گرفته. حتما برای اجرای پروژه یک دیتابیس با اسم CMS بسازید و فایل دیتابیس قرار گرفته شده رو ایمپورت کنید داخلش.

