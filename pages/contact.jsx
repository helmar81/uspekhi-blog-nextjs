jsx
import Head from 'next/head';
import BaseHead from '../components/BaseHead'; // Assuming BaseHead is in the components directory

const Contact = () => {
  return (
    <>
      <BaseHead title="Text Me" description="Contact Form" />

      <main className="py-12 lg:py-20">
        <article className="max-w-4xl mx-auto px-4">
          <header className="mx-auto max-w-2xl text-center content">
            {/* Add your header content here if any */}
          </header>

          <body className="bg-white text-gray-500 font-body leading-normal personality-casual">
            <section className="contact-section">
              <div className="contact-intro">
                <p className="contact-description">
                  Fill out the form below and I will
                   get back to you as soon as possible.
                </p>
              </div>

              <form className="contact-form" action="https://api.web3forms.com/submit" method="POST">
                <input type="hidden" name="access_key" value="867d80d5-0fc9-422b-b90b-9f3f83ec6b50" />
                <input type="hidden" name="subject" value="New Contact Form Submission from Web3Forms" />
                <input type="hidden" name="from_name" value="My Website" />

                <div className="form-group-container">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input id="name" name="name" className="form-input" placeholder="Your name" type="text" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input id="email" name="email" className="form-input" placeholder="Your email" type="email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor