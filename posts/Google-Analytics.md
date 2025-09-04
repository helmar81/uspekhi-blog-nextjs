---
title: 'Google Analytics'
date: '2024-07-22'
---

## 📊 

**Google Analytics** is a free web analytics service provided by Google. It helps you understand how users find, navigate, and interact with your website.

---

## 🔍 What Can You Track?

With Google Analytics, you can monitor:

- **Pageviews**
- **Bounce rate**
- **Time on site**
- **User behavior**
- **Conversions and goals**
- **Traffic sources**
- **User demographics and devices**

You can also segment your audience to gain deeper insights into how different user groups interact with your content.

---

## 🛠️ How to Set Up Google Analytics

1. **Create a Google Analytics account** at [analytics.google.com](https://analytics.google.com/)
2. Get your **tracking code**
3. Paste the code **in the `<head>` section** of every page you want to track

---

## 💡 Tip: Add the Google Tag Manually

Here’s the default tracking snippet you’ll receive. Replace `G-YOUR-TAG` with your actual measurement ID.

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-TAG"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-YOUR-TAG');
</script>
