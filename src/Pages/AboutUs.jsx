import React from "react";
import { useEffect } from "react";
import "./AboutUs.css";

function AboutUs() {
  useEffect(() => {
    // TO MOUNT ON THE TOP LEVEL
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="container about pt-1">
        <div className="row">
          <div className="col-md-6">
            <img
              loading="lazy"
              src="https://st4.depositphotos.com/26272580/31072/v/450/depositphotos_310724682-stock-illustration-contact-us-woman-with-headphones.jpg"
              className="img-fluid"
              alt="about"
            />
          </div>

          <div className="col-md-6 about-head">
            <h2>About Us</h2>

            <p>
              Medicarepharma, with 15 years of expertise in the pharmaceutical
              industry, specializes in providing effective wellness solutions to
              improve overall well-being and relationship satisfaction. Our
              mission is to support individuals and couples in overcoming
              challenges that affect their happiness and connection, enhancing
              their quality of life and fostering stronger bonds.
              <br /> <br />
              Our dedicated team of experts ensures that our solutions are safe,
              reliable, and tailored to meet the unique needs of our customers.
              Through <strong>Happy Couple Solutions</strong>, we offer
              innovative products and services designed to promote harmony,
              reduce stress, and inspire joy in relationships.
              <br />
              <br />
              Discover a happier, more connected life with Medicarepharma and
              Happy Couple Solutions.
            </p>

            <div className="about-social pt-4">
              <a
                href="https://www.facebook.com/happycouplesolution/"
                target="_blank"
                className="btn-about btn"
              >
                <i class="fa-brands fa-facebook-f"></i>
              </a>

              <a
                href="https://www.instagram.com/happycouplesolution/"
                target="_blank"
                className="btn-about btn"
              >
                <i class="fa-brands fa-instagram"></i>
              </a>

              <a
                href="https://x.com/happycouplesolu"
                className="btn-about btn"
                target="_blank"
              >
                <i class="fa-brands fa-x-twitter"></i>
              </a>

              <a
                href="https://in.pinterest.com/happycouplesolution/"
                target="_blank"
                className="btn-about btn"
              >
                <i class="fa-brands fa-pinterest"></i>
              </a>
            </div>
          </div>
        </div>

        <div className=" mt-5 about-foot">
          <h2>HAPPY COUPLE SOLUTION</h2>

          <p>
            Welcome to Happy Couple Solutions! We provide accessible and
            confidential solutions designed to improve relationship happiness,
            wellness, and satisfaction. Specializing in innovative scientific
            approaches, we offer high-quality care to address challenges such as
            stress, confidence issues, and reduced happiness in relationships.
            Our team of experts is dedicated to breaking taboos around wellness
            and relationship health, offering personalized and evidence-based
            treatments tailored to your needs.
          </p>
          <p>
            With a focus on discretion and professionalism, we are committed to
            enhancing your well-being through advanced, research-backed
            solutions. Trust us to guide you on a journey towards a healthier,
            more harmonious relationship.
          </p>

          <h4>Our unique product and services</h4>

          <p>
            Our specially designed wellness solutions include advanced medicines
            that promote vitality, improve overall well-being, and help manage
            stress effectively. These products are tailored to restore
            confidence, foster stronger connections, and encourage deeper
            relationship satisfaction. Use under expert guidance ensures safety
            and optimal results.
          </p>

          <p>
            Erectaid Ultra is an advanced, non-invasive wellness device that
            uses vacuum therapy to enhance natural blood flow and promote
            wellness. This unique solution is a safe and effective alternative
            for individuals seeking a natural approach to improved well-being
            and connection.
          </p>
          <h4>Counselling Services</h4>

          <p>
            Happy Couple Solutions offers personalized Counselling Services
            focused on wellness, stress management, and relationship
            satisfaction. Our holistic approach includes tailored treatment
            plans, therapy, and education to foster deeper emotional bonds and
            greater harmony.
          </p>

          <p>
            Rediscover joy, connection, and confidence with Happy Couple
            Solutions—your partner in wellness and happiness.
          </p>
        </div>
      </section>
    </>
  );
}

export default AboutUs;
