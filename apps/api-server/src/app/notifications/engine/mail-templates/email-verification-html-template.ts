/* cspell:disable */
export const emailVerificationHtmlTemplate = `
 <!DOCTYPE html>
<html>
  <head> </head>
  <body
    style="
      text-align: center;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    "
  >
    <div
      style="
        width: 100%;
        padding: 20px;
        background-color: #f4f4f4;
        display: flex;
        justify-content: center;
      "
    >
      <div
        style="
          width: 100%;
          max-width: 600px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
        "
      >
        <div
          style="
            background-color: #1a294b;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            border-radius: 8px 8px 0 0;
            padding: 10px;
          "
        >
          <img
            src="https://app-beta.getpilot.ai/assets/images/logo.png"
            alt="logo"
            style="padding: 10px; width: 50%; max-width: 100%"
          />
        </div>
        <div
          style="
            font-size: 16px;
            line-height: 1.5;
            color: #333333;
            margin-bottom: 20px;
            padding: 20px;
          "
        >
          <h2 style="margin: 0">You’re almost there!</h2>
          <p style="margin: 20px 0">
            Just verify your email. Then our entire platform is yours to explore.
          </p>
          <a
            href="{{verificationLink}}"
            target="_blank"
            style="
              background-color: #246cf9;
              border: none;
              color: white;
              padding: 15px 32px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              border-radius: 4px;
            "
            >Verify Email</a
          >
          <p style="margin: 20px 0">Weren't expecting this email? Ignore it.</p>
        </div>
      </div>
    </div>
  </body>
</html> 
  `