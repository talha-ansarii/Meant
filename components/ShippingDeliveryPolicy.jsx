import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const PrivacyPolicy = () => {
  return (
    <div className="pb-4">
      <Header />
      <main className="pt-28">
        <h1 className="text-3xl md:text-5xl font-playfair-display font-normal text-center mb-8">
          Shipping and Delivery Policy
        </h1>
        <p className="text-center font-merriweather font-normal text-sm md:text-base text-gray-500 mb-8">
          Effective Date: April 1, 2024
        </p>
        <section className="max-w-4xl mx-auto font-merriweather font-medium md:text-left text-center px-10 md:px-4">
          <p className="text-base md:text-lg  text-gray-500  leading-relaxed mb-4">
            Once our system processes your order, your products are thoroughly
            inspected to ensure they are in perfect condition. After passing the
            final round of quality checks, they are carefully packed and handed
            over to our trusted delivery partner. Our delivery partners will
            bring the package to you as soon as possible. If they are unable to
            reach your provided address or deliver at a suitable time, they will
            contact you to resolve the issue. All confirmed orders are usually
            shipped within 3-4 business working days (excluding Sundays and
            public holidays). Once shipped, they'll be delivered to you within
            5-7 working days (excluding Sundays and public holidays). While we
            strive to avoid delays, dispatches may be delayed during Mega Sale
            events due to increased volumes.
          </p>
          <p className="text-base md:text-lg  text-gray-500 leading-relaxed mb-4">
            After placing your order, you will receive a confirmation message on
            your registered email and phone number. You can check the status of
            your package through the 'Tracking ID' in the 'Confirmation email.'
            When purchasing any product/physical good, you agree to provide us
            with a valid email, phone number, and shipping address, as well as
            valid billing information. Estimated delivery time may change due to
            the customer’s geographical location, shipping destination, product
            availability, and courier partner’s delivery time & location. A
            standard shipping charge is applied to all orders. We are currently
            not accepting Cash On Delivery (COD) orders. In case of one or more
            defective products in your order, please register a single complaint
            as the return/replacement will be arranged only once. We advise the
            customers not to accept any tampered or damaged packages.
          </p>
          <p className="text-base md:text-lg  text-gray-500 leading-relaxed mb-4">
            While we make reasonable endeavors in ensuring that purchased
            Products are delivered to you in a timely manner and within the
            timeline notified to you, you accept and acknowledge that the
            delivery may be delayed on account of:
          </p>
          <ul className="text-base md:text-lg  text-gray-500 leading-relaxed mb-4">
            <li>a. Logistical issues beyond our control;</li>
            <li>b. Unsuitable weather conditions;</li>
            <li>c. Political disruptions, strikes, employee lockouts, etc.;</li>
            <li>d. Acts of God such as floods, earthquakes, etc.;</li>
            <li>e. Other unforeseeable circumstances.</li>
          </ul>

          <p className="text-base md:text-lg  text-gray-500 leading-relaxed mb-4">
            In such events of delay, we shall make reasonable attempts to inform
            you by writing to your email ID and/or mobile number registered with
            us. We disclaim all liabilities that may arise on account of our
            failure to inform or notify you of delays in the delivery of
            purchased Products on our website. Further, we shall be under no
            obligation to compensate you for any claim that may otherwise arise
            on account of delay in the shipment or delivery or use of the
            purchased Products. We are not responsible for any damage caused
            after delivery.
          </p>
          <p className="text-base md:text-lg  text-gray-500 leading-relaxed mb-4">
            Shipment costs and dates are subject to change from the costs and
            dates you are quoted due to unforeseeable circumstances. For any
            questions, concerns, or disputes, you agree to contact us in a
            timely manner at the following: meantconnect@gmail.com.
          </p>
          <p className="text-base md:text-lg  text-gray-500 leading-relaxed mb-4">
            We endeavor to engage logistic partners, employees, and agents with
            the highest regard for ethics and integrity; and behave in a fashion
            that exudes thorough professionalism, competence, and good
            mannerism. For the sake of abundant clarity, it is stated that any
            ill-mannerism, impoliteness, discourtesy, or offensiveness shown by
            the third-party delivery executives or the employees, agents, or
            personnel of the logistic partners is beyond our control and any
            issue arising between you and the delivery executive or an employee,
            agent, or personnel of the logistic partner will have to be resolved
            by you independently. You agree and acknowledge that you will not
            hold us responsible or require us to settle, mediate, or resolve any
            disputes between you and the third-party delivery personnel
            delivering the Products to you. It is clarified that we engage
            third-party service providers to effectuate deliveries of the
            Products and hence, we do not guarantee the accuracy or correctness
            of the tracking status, and the status may be subject to
            inconsistencies arising out of time-lags in updating the information
            and/or other technical difficulties which are not in our control.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
