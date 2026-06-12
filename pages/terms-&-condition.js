import React from "react";
import Head from "next/head";

const TermsAndConditions = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions - SPayTimes News</title>
        <meta
          name="description"
          content="Read the Terms and Conditions of SPayTimes News before using our website and services."
        />
      </Head>

      <div
        style={{
          maxWidth: "800px",
          margin: "40px auto",
          padding: "30px 20px",
          color: "#fff",
          backgroundColor: "#111",
          fontFamily: "sans-serif",
          lineHeight: "1.8",
        }}
      >
        {/* মেইন হেডিং */}
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#ff4d4d",
            textAlign: "center",
            marginBottom: "30px",
            borderBottom: "2px solid #222",
            paddingBottom: "15px",
          }}
        >
          Terms and Conditions
        </h1>

        <p style={{ fontSize: "15px", color: "#aaa", marginBottom: "25px" }}>
          Welcome to SPayTimes News. By accessing or using our website
          (https://spaytimes.xyz/), you agree to comply with and be bound by the
          following terms and conditions. Please read them carefully.
        </p>

        {/* সেকশন ১ */}
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{ color: "#ff4d4d", fontSize: "20px", marginBottom: "10px" }}
          >
            1. Acceptance of Terms
          </h2>
          <p style={{ fontSize: "15px", color: "#ccc" }}>
            By using this website, you signify your acceptance of these Terms
            and Conditions. If you do not agree to these terms, please do not
            use our site. We reserve the right to modify or update these terms
            at any time without prior notice.
          </p>
        </div>

        {/* সেকশন ২ */}
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{ color: "#ff4d4d", fontSize: "20px", marginBottom: "10px" }}
          >
            2. Intellectual Property Rights
          </h2>
          <p style={{ fontSize: "15px", color: "#ccc" }}>
            Unless otherwise stated, SPayTimes News and/or its licensors own the
            intellectual property rights for all material on this website. All
            intellectual property rights are reserved. You may access this from
            SPayTimes News for your own personal use subjected to restrictions
            set in these terms.
          </p>
          <p style={{ fontSize: "15px", color: "#ccc", marginTop: "10px" }}>
            <strong>You must not:</strong> Republish, sell, rent, sub-license,
            duplicate, or copy material from our website without explicit
            written permission.
          </p>
        </div>

        {/* সেকশন ৩ */}
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{ color: "#ff4d4d", fontSize: "20px", marginBottom: "10px" }}
          >
            3. User Content and Conduct
          </h2>
          <p style={{ fontSize: "15px", color: "#ccc" }}>
            Parts of this website may offer an opportunity for users to post
            opinions or information. SPayTimes News does not filter, edit,
            publish, or review comments prior to their presence on the website.
            Comments do not reflect the views and opinions of SPayTimes News. We
            reserve the right to monitor all comments and remove any which can
            be considered inappropriate or offensive.
          </p>
        </div>

        {/* সেকশন ৪ */}
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{ color: "#ff4d4d", fontSize: "20px", marginBottom: "10px" }}
          >
            4. Content Liability & Accuracy
          </h2>
          <p style={{ fontSize: "15px", color: "#ccc" }}>
            While we strive to provide accurate and up-to-date global news,
            politics, and tech updates, we do not warrant the completeness or
            accuracy of the information published on this website; nor do we
            promise to ensure that the website remains available or that the
            material on the website is kept up to date.
          </p>
        </div>

        {/* সেকশন ৫ */}
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{ color: "#ff4d4d", fontSize: "20px", marginBottom: "10px" }}
          >
            5. Hyperlinking to our Content
          </h2>
          <p style={{ fontSize: "15px", color: "#ccc" }}>
            Government agencies, search engines, and news organizations may link
            to our website without prior written approval. However, no use of
            SPayTimes News's logo or other artwork will be allowed for linking
            absent a trademark license agreement.
          </p>
        </div>

        <hr style={{ borderColor: "#333", margin: "35px 0" }} />

        {/* যোগাযোগ সেকশন */}
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#aaa", fontSize: "16px", marginBottom: "10px" }}>
            If you have any questions about our Terms and Conditions, please
            contact us:
          </p>
          <a
            href="mailto:riyadkhan9904@gmail.com"
            style={{
              color: "#38bdf8",
              fontSize: "16px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            riyadkhan9904@gmail.com
          </a>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
